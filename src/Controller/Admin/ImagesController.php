<?php

namespace App\Controller\Admin;

use App\Repository\ProductItemImageRepository;
use App\Service\FileUploader;
use Doctrine\ORM\EntityManager;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AdminController as BaseAdminController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class ImagesController extends BaseAdminController
{
    private $entityManager;

    private $fileUploader;

    /**
     * @Route("/images/order", methods={"POST","HEAD"})
     */
    public function order(
        Request $request,
        ProductItemImageRepository $productItemImageRepository,
        EntityManager $entityManager
    ) {
        $itemImage = $productItemImageRepository->find($request->request->get('id'));
        $itemImage->setSortOrder($request->request->get('value'));

        $entityManager->persist($itemImage);
        $entityManager->flush();

        $response = new Response();
        $response->setContent(json_encode(['success']));
        $response->headers->set('Content-Type', 'application/json');
        return $response;
    }

    public function __construct(
        EntityManager $entityManager,
        FileUploader $fileUploader
    ) {
        $this->entityManager = $entityManager;
        $this->fileUploader  = $fileUploader;
    }

    public function upload(Request $request)
    {
        $images = [];
        if ($type = $request->request->get('type', false)) {
            $className = 'App\\Entity\\' . $type;
            if (class_exists($className)) {
                foreach ($request->files->all() as $file) {
                    $fileName = $this->fileUploader
                        ->setTargetDirectory($this->getPath($type))
                        ->upload($file);
                    if(!$request->request->get('no_persist', false)) {
                        $entity = new $className;
                        $entity->setPath($fileName);
                        $this->entityManager->persist($entity);
                        $this->entityManager->flush();
                    }
                    $images[] = [
                        'id'   => (isset($entity)) ? $entity->getId() : 0,
                        'path' => $this->getUrl($type) . '/' . $fileName
                    ];
                }
            }
        }
        $response = new Response();
        $response->setContent(json_encode($images));
        $response->headers->set('Content-Type', 'application/json');
        return $response;
    }

    /**
     * @param Request $request
     * @return Response
     */
    public function upload_once(Request $request)
    {
        if ($type = $request->request->get('type', false)) {
            $file     = $request->files->get('file');
            $fileName = $this->fileUploader
                ->setTargetDirectory($this->getPath($type))
                ->upload($file);
        }
        $response = new Response();
        $response->setContent(
            json_encode(
                ['image' => $this->getUrl($type) . '/' . $fileName]
            )
        );
        $response->headers->set('Content-Type', 'application/json');
        return $response;
    }

    public function delete(Request $request)
    {
        $type = $request->query->get('type');

        $image = $this->entityManager
            ->getRepository('App:' . $type)
            ->find((int)$request->query->get('eid'));

        if ($image) {
            $this->entityManager->remove($image);
            $this->entityManager->flush();
        }

        @unlink($this->getPath($type) . '/' . $image->getPath());

        $response = new Response();
        $response->setContent(json_encode([]));
        $response->headers->set('Content-Type', 'application/json');

        return $response;
    }

    public function getPath($type)
    {
        return $this->getParameter('app.path.' . $type);
    }

    public function getUrl($type)
    {
        return $this->getParameter('app.url.' . $type);
    }
}
