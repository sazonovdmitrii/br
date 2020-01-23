<?php

namespace App\Controller;

use EasyCorp\Bundle\EasyAdminBundle\Controller\AdminController as BaseAdminController;

class AdminController extends BaseAdminController
{
//    public function __construct()
//    {
//        die('adsf');
//    }

    protected function persistEntity($entity)
    {
        $this->em->persist($entity);
        $this->em->flush();
    }

    protected function updateEntity($entity)
    {
        $this->em->flush();
    }

    protected function removeEntity($entity)
    {
        $this->em->remove($entity);
        $this->em->flush();
    }

    public function repository($className)
    {
        return $this->getDoctrine()->getRepository($className);
    }


}
