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
        $locale = ($this->getLocale()) ? $this->getLocale() : $this->getRequest()->getLocale();
        $this->repository->setLocale($locale);
        if ($this->hasRequestQuery('tag')) {
            $images = $this->getImagesByTag($this->getRequestQuery('tag'));
        } elseif ($this->hasRequestQuery('product')) {
            $images = $this->getImagesByProduct($this->getRequestQuery('product'));
        } elseif ($this->hasRequestQuery('item')) {
            $images = $this->getImagesByProductItem($this->getRequestQuery('item'));
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
            $this->click($this->getRequestParam('id'));
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
            $this->purchase($this->getRequestParam('id'));
        }
        if ($this->hasRequestParam('ids')) {
            $this->purchases($this->getRequestParam('ids'));
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
    public function getImagesByTag($tagName): array
    {
        return $this->repository->findBy(['hash_tag' => $tagName]);
    }

    /**
     * @return array
     * @throws DBALException
     */
    public function getImagesByProduct($productId): array
    {
        $product = $this->productRepository->find($productId);
        if ($product) {
            return $this->repository->findByProduct($product);
        }
        return [];
    }

    /**
     * @return array
     * @throws DBALException
     */
    public function getImagesByProductItem($productItemId): array
    {
        $productItem = $this->itemRepository->find($productItemId);
        if ($productItem) {
            return $this->repository->findByProductItem($productItem);
        }
        return [];
    }

    public function getAllImages()
    {
        return $this->repository->findBy([], ['id' => 'DESC']);
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

    /**
     * @param $locale
     * @return $this
     */
    public function setRepositoryLocale($locale)
    {
        $this->repository->setLocale($locale);
        return $this;
    }

    /**
     * @param int $id
     * @return bool
     */
    public function click(int $id)
    {
        return $this->repository->click($id);
    }

    /**
     * @param int $id
     * @return bool
     */
    public function purchase(int $id)
    {
        return $this->repository->purchase($id);
    }

    /**
     * @param array $ids
     * @return bool
     */
    public function purchases(array $ids)
    {
        return $this->repository->purchases($ids);
    }
}