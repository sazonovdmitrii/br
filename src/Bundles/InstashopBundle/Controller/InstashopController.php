<?php
/**
 * Разработчик: Харсеев Владимир Александрович
 * Email: vkharseev@gmail.com
 * Последнее обновление: 09.04.2020.
 */

namespace App\Bundles\InstashopBundle\Controller;


use Error;
use Exception;
use App\Bundles\InstashopBundle\Service\{Instashop, Collection};
use Symfony\Component\HttpFoundation\{Request, RedirectResponse};
use Doctrine\ORM\{ORMException, EntityManager, OptimisticLockException};
use App\Bundles\InstashopBundle\Repository\InstashopRepository as Repository;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AdminController as BaseAdminController;

class InstashopController extends BaseAdminController
{
    /** @var EntityManager The Doctrine entity manager for the current entity */
    protected $em;

    /** @var Request The instance of the current Symfony request */
    protected $request;

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
     * @param Instashop $service
     * @return RedirectResponse
     */
    public function search(Instashop $service): RedirectResponse
    {
        try {
            /** @var Collection $images */
            $images = $service->setQuery($this->request->query->get('query'))->get();
            $this->repository->truncate()->import($images, $this->request->query->get('query'));
            $this->addFlash('success', sprintf('Operation completed successfully. Imported %d new images', $images->length()));
        } catch (Exception $exception) {
            $this->addFlash('warning', $exception->getMessage());
        } catch (Error $exception) {
            $this->addFlash('error', $exception->getMessage());
        }
        return $this->redirectToReferrer();
    }


    /**
     * @return RedirectResponse
     * @throws ORMException
     * @throws OptimisticLockException
     */
    public function approveAction(): RedirectResponse
    {
        $result = $this->repository->approve($this->request->query->get('id'));
        if ($result === true) {
            $this->addFlash('success', 'Operation completed successfully. Image is approved');
        } else {
            $this->addFlash('error', 'Operation failed. Image is not approved');
        }
        return $this->redirectToRoute('easyadmin', array(
            'action' => 'list',
            'entity' => $this->request->query->get('entity'),
        ));
    }

    /**
     * @return RedirectResponse
     * @throws ORMException
     * @throws OptimisticLockException
     */
    public function rejectAction(): RedirectResponse
    {
        $result = $this->repository->reject($this->request->query->get('id'));
        if ($result === true) {
            $this->addFlash('success', 'Operation completed successfully. Image is rejected');
        } else {
            $this->addFlash('error', 'Operation failed. Image is not rejected');
        }
        return $this->redirectToRoute('easyadmin', array(
            'action' => 'list',
            'entity' => $this->request->query->get('entity'),
        ));
    }

    /**
     * Allows applications to modify the entity associated with the item being
     * edited before updating it.
     *
     * @param object $entity
     * @throws ORMException
     */
    protected function updateEntity($entity): void
    {
        $this->repository->joinProducts($entity, $this->request->request->get('products'));
        parent::updateEntity($entity);
    }
}