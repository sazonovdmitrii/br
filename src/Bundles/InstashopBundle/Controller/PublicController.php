<?php
/**
 * Разработчик: Харсеев Владимир Александрович
 * Email: vkharseev@gmail.com
 * Последнее обновление: 17.04.2020.
 */

namespace App\Bundles\InstashopBundle\Controller;

use Symfony\Component\HttpFoundation\{Request, Response};
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use App\Bundles\InstashopBundle\Repository\RedisRepository as Repository;

/**
 * Class PublicController
 *
 * @package App\Bundles\InstashopBundle\Controller
 */
class PublicController extends AbstractController
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

    public function index(Request $request): Response
    {
        $gallery = $this->repository->setLocale($request->getLocale())->getGallery($request);
        return $this->render(
            '@Instashop/Instashop/public/index.html.twig',
            ['gallery' => $gallery]
        );
    }
}