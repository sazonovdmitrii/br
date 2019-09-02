<?php

namespace App\Controller\Admin;

use EasyCorp\Bundle\EasyAdminBundle\Controller\AdminController as BaseAdminController;
use Doctrine\ORM\EntityManager;
use App\Service\FileUploader;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class ImagesController extends BaseAdminController
{
    private $entityManager;

    private $fileUploader;

    public function __construct(
        EntityManager $entityManager,
        FileUploader $fileUploader
    ) {
        $this->entityManager = $entityManager;
        $this->fileUploader = $fileUploader;
    }

    public function upload(Request $request)
    {
        $images = [];
        if($type = $request->request->get('type', false)) {
            $className = 'App\\Entity\\' . $type;
            if(class_exists($className)) {
                foreach($request->files->all() as $file) {
                    $fileName = $this->fileUploader
                        ->setTargetDirectory($this->getPath($type))
                        ->upload($file);
                    $entity = new $className;
                    $entity->setPath($fileName);
                    $this->entityManager->persist($entity);
                    $this->entityManager->flush();
                    $images[] = [
                        'id' => $entity->getId(),
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

    public function getPath($type)
    {
        return $this->getParameter('app.path.' . $type);
    }

    public function getUrl($type)
    {
        return $this->getParameter('app.url.' . $type);
    }
}
