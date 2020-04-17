<?php
/**
 * Разработчик: Харсеев Владимир Александрович
 * Email: vkharseev@gmail.com
 * Последнее обновление: 17.04.2020.
 */

namespace App\Bundles\InstashopBundle\Controller;

use Doctrine\DBAL\DBALException;
use Doctrine\ORM\{ORMException, OptimisticLockException};
use Symfony\Component\HttpFoundation\{Request, Response};
use App\Repository\{ProductRepository, ProductItemRepository};
use App\Bundles\InstashopBundle\Repository\InstashopRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

/**
 * Class ApiController
 *
 * @package App\Bundles\InstashopBundle\Controller
 */
class ApiController extends AbstractController
{
    /**
     * @var Request
     */
    private $request;
    /**
     * @var InstashopRepository
     */
    private $repository;
    /**
     * @var ProductRepository
     */
    private $productRepository;
    /**
     * @var ProductItemRepository
     */
    private $itemRepository;

    /**
     * InstashopController constructor.
     *
     * @param InstashopRepository $repository
     * @param ProductRepository $productRepository
     * @param ProductItemRepository $itemRepository
     */
    public function __construct(
        InstashopRepository $repository,
        ProductRepository $productRepository,
        ProductItemRepository $itemRepository
    ) {
        $this->repository = $repository;
        $this->productRepository = $productRepository;
        $this->itemRepository = $itemRepository;
    }

    /**
     * @param Request $request
     * @return Response
     * @throws DBALException
     */
    public function findByCriteria(Request $request): Response
    {
        $this->setRequest($request);
        $this->repository->setLocale($this->getRequest()->getLocale());
        if ($this->hasRequestQuery('tag')) {
            $images = $this->getImagesByTag();
        } elseif ($this->hasRequestQuery('product')) {
            $images = $this->getImagesByProduct();
        } elseif ($this->hasRequestQuery('item')) {
            $images = $this->getImagesByProductItem();
        } else {
            return $this->response(['status' => false], Response::HTTP_BAD_REQUEST);
        }
        return $this->response([
            'status' => true,
            'images' => $images,
        ]);
    }

    /**
     * @param Request $request
     * @return Response
     * @throws ORMException
     * @throws OptimisticLockException
     */
    public function saveClick(Request $request): Response
    {
        $this->setRequest($request);
        if ($this->hasRequestParam('id')) {
            $this->repository->click($this->getRequestParam('id'));
            return $this->response();
        }
        return $this->response(['status' => false], Response::HTTP_BAD_REQUEST);
    }

    /**
     * @param Request $request
     * @return Response
     * @throws ORMException
     * @throws OptimisticLockException
     */
    public function savePurchases(Request $request): Response
    {
        $this->setRequest($request);
        if ($this->hasRequestParam('id')) {
            $this->repository->purchase($this->getRequestParam('id'));
        }
        if ($this->hasRequestParam('ids')) {
            $this->repository->purchases($this->getRequestParam('ids'));
        }
        return $this->response();
    }

    /**
     * @param array $content
     * @param int $code
     * @return Response
     */
    private function response(array $content = null, int $code = null): Response
    {
        $response = new Response();
        $response->setContent(json_encode($content ?: ['status' => true]));
        $response->setStatusCode($code ?: Response::HTTP_OK);
        $response->headers->set('Content-Type', 'application/json');
        return $response;
    }

    /**
     * @return array
     */
    private function getImagesByTag(): array
    {
        return $this->repository->findByTag($this->getRequestQuery('tag'));
    }

    /**
     * @return array
     * @throws DBALException
     */
    private function getImagesByProduct(): array
    {
        $product = $this->productRepository->find($this->getRequestQuery('product'));
        if ($product) {
            return $this->repository->findByProduct($product);
        }
        return [];
    }

    /**
     * @return array
     * @throws DBALException
     */
    private function getImagesByProductItem(): array
    {
        $productItem = $this->itemRepository->find($this->getRequestQuery('item'));
        if ($productItem) {
            return $this->repository->findByProductItem($productItem);
        }
        return [];
    }

    /**
     * @return Request
     */
    private function getRequest(): Request
    {
        return $this->request;
    }

    /**
     * @param Request $request
     * @return $this
     */
    private function setRequest(Request $request): self
    {
        $this->request = $request;
        return $this;
    }

    /**
     * @param $key
     * @return bool
     */
    private function hasRequestQuery($key): bool
    {
        return $this->getRequest()->query->has($key);
    }

    /**
     * @param $key
     * @param string $default
     * @return mixed
     */
    private function getRequestQuery($key, $default = '')
    {
        return $this->getRequest()->query->get($key, $default);
    }

    /**
     * @param $key
     * @return bool
     */
    private function hasRequestParam($key): bool
    {
        return $this->getRequest()->request->has($key);
    }

    /**
     * @param $key
     * @param string $default
     * @return mixed
     */
    private function getRequestParam($key, $default = '')
    {
        return $this->getRequest()->request->get($key, $default);
    }
}