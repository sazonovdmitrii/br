<?php
/**
 * Разработчик: Харсеев Владимир Александрович
 * Email: vkharseev@gmail.com
 * Последнее обновление: 17.04.2020.
 */

namespace App\Bundles\InstashopBundle\Controller;

use Doctrine\ORM\{ORMException, OptimisticLockException};
use Symfony\Component\HttpFoundation\{Request, Response};
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use App\Bundles\InstashopBundle\Repository\InstashopRepository as Repository;

/**
 * Class ApiController
 *
 * @package App\Bundles\InstashopBundle\Controller
 */
class ApiController extends AbstractController
{
    /**
     * @var Repository
     */
    private $repository;

    /**
     * InstashopController constructor.
     *
     * @param Repository $repository
     */
    public function __construct(Repository $repository)
    {
        $this->repository = $repository;
    }

    /**
     * @param Request $request
     * @return Response
     */
    public function findByTag(Request $request): Response
    {
        $this->repository->setLocale($request->getLocale());
        $images = $this->repository->findByTag($request->query->get('tag'));
        return $this->response([
            'tag'    => $request->query->get('tag'),
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
        if ($request->request->has('id')) {
            $this->repository->click($request->request->get('id'));
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
        if ($request->request->has('id')) {
            $this->repository->purchase($request->request->get('id'));
        }
        if ($request->request->has('ids')) {
            $this->repository->purchases($request->request->get('ids'));
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
}