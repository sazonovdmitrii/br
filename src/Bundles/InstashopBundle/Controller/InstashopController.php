<?php
/**
 * Разработчик: Харсеев Владимир Александрович
 * Email: vkharseev@gmail.com
 * Последнее обновление: 16.04.2020.
 */

namespace App\Bundles\InstashopBundle\Controller;

use Error;
use Exception;
use App\Bundles\InstashopBundle\Service\{Instashop};
use Doctrine\ORM\{ORMException, OptimisticLockException};
use App\Bundles\InstashopBundle\Repository\InstashopRepository as Repository;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AdminController as BaseAdminController;
use Symfony\Component\HttpFoundation\{Request, Response, File\File, RedirectResponse, File\UploadedFile};

/**
 * Class InstashopController
 *
 * @package App\Bundles\InstashopBundle\Controller
 */
class InstashopController extends BaseAdminController
{
    /** @var Request The instance of the current Symfony request */
    protected $request;
    /** @var Repository */
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
     * @param Instashop $service
     * @return RedirectResponse
     */
    public function search(Request $request, Instashop $service): RedirectResponse
    {
        try {
            $images = $service->setQuery($request->query->get('query'))->get();
            $this->repository->truncate()->import($images, $request->query->get('query'));
            $this->addFlash('success',
                sprintf('Operation completed successfully. Imported %d new images', $images->count())
            );
        } catch (Exception $exception) {
            $this->addFlash('warning', $exception->getMessage());
        } catch (Error $exception) {
            $this->addFlash('error', $exception->getMessage());
        }
        return $this->redirect($request->headers->get('referer'));
    }

    /**
     * @param Request $request
     * @param Instashop $service
     * @return Response
     * @throws Exception
     */
    public function upload(Request $request, Instashop $service): Response
    {
        $response = new Response();
        $content = ['status' => false, 'message' => 'Не загружено'];
        $response->setStatusCode(Response::HTTP_BAD_REQUEST);
        if ($request->files->count()) {
            foreach ($request->files->all() as $file) {
                /** @var UploadedFile $file */
                $fileName = md5(uniqid(time(), true)) . '.' . $file->guessExtension();
                $uploadedFile = $file->move(
                    $this->get('kernel')->getProjectDir() . '/public/images/instashop',
                    $fileName
                );
                if ($uploadedFile instanceof File) {
                    $images = $service->setQuery($uploadedFile->getRealPath())->get();
//                    $this->repository->truncate();
                    $this->repository->import($images, '#dropzona');
                    $content = ['status' => true, 'message' => 'Загружено'];
                    $response->setStatusCode(Response::HTTP_CREATED);
                    break;
                }
            }
        }
        $response->setContent(json_encode($content));
        $response->headers->set('Content-Type', 'application/json');
        return $response;
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
        return $this->redirectToRoute('easyadmin', [
            'action' => 'list',
            'entity' => $this->request->query->get('entity'),
        ]);
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
        return $this->redirectToRoute('easyadmin', [
            'action' => 'list',
            'entity' => $this->request->query->get('entity'),
        ]);
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
        $this->repository->joinProducts($entity, $this->request->request->get('products', []));
        $this->repository->saveCoordinates($entity, $this->request->request->get('coordinates', ''));
        parent::updateEntity($entity);
    }
}