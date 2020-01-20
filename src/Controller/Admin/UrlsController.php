<?php

namespace App\Controller\Admin;

use Doctrine\ORM\EntityManager;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AdminController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class UrlsController extends AdminController
{
    /**
     * @Route("/admin/urls/add", methods={"POST","HEAD"})
     */
    public function add(
        Request $request,
        EntityManager $entityManager
    ) {
        $repository = $entityManager->getRepository('App:' . $request->get('entity'));

        $checkUrl = $repository->findOneBy(
            ['url' => $request->get('url')]
        );

        if ($checkUrl) {
            $id = $checkUrl->getId();
        } else {
            $className = '\\App\\Entity\\' . $request->get('entity');
            $catalogUrl = new $className();
            $catalogUrl->setUrl($request->get('url'));

            $entityManager->persist($catalogUrl);
            $entityManager->flush();

            $id = $catalogUrl->getId();
        }

        $response = new Response();
        $response->setContent(json_encode([
                    'id' => $id
                ]
            )
        );
        $response->headers->set('Content-Type', 'application/json');
        return $response;
    }

    /**
     * @Route("/admin/urls/delete", methods={"POST","HEAD"})
     */
    public function delete(
        Request $request,
        EntityManager $entityManager
    ) {
        $urlId      = $request->get('url_id');
        $repository = $entityManager->getRepository('App:' . $request->get('entity'));

        $url = $repository->find($urlId);

        if ($url) {
            $entityManager->remove($url);
            $entityManager->flush();
        }

        $response = new Response();
        $response->setContent(json_encode([
                    'id' => $urlId
                ]
            )
        );
        $response->headers->set('Content-Type', 'application/json');
        return $response;
    }
}
