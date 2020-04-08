<?php
/**
 * Разработчик: Харсеев Владимир Александрович
 * Email: vkharseev@gmail.com
 * Последнее обновление: 06.04.2020.
 */

namespace App\Bundles\InstashopBundle\Controller;


use Error;
use Exception;
use App\Bundles\InstashopBundle\Service\{Instashop, Collection};
use Symfony\Component\HttpFoundation\{Request, RedirectResponse};
use App\Bundles\InstashopBundle\Repository\InstashopRepository as Repository;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AdminController as BaseAdminController;

class InstashopController extends BaseAdminController
{
    /**
     * @var Repository
     */
    private $repository;

    /**
     * InstashopController constructor.
     * @param Repository $repository
     */
    public function __construct(Repository $repository)
    {
        $this->repository = $repository;
    }

    /**
     * @param Request $request
     * @param Instashop $service
     * @return RedirectResponse
     */
    public function search(Request $request, Instashop $service): RedirectResponse
    {
        try {
            /** @var Collection $images */
            $images = $service->setQuery($request->query->get('query'))->get();
            $this->repository->truncate()->import($images);
            $this->addFlash('success', sprintf('Operation completed successfully. Imported %d new images', $images->length()));
        } catch (Exception $exception) {
            $this->addFlash('warning', $exception->getMessage());
        } catch (Error $exception) {
            $this->addFlash('error', $exception->getMessage());
        }
        return $this->redirect($request->headers->get('referer'));
    }
}