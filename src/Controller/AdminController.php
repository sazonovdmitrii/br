<?php

namespace App\Controller;

use EasyCorp\Bundle\EasyAdminBundle\Controller\AdminController as BaseAdminController;
use App\Service\TagService;
use Doctrine\ORM\EntityManager;
use App\Entity\Product;

class AdminController extends BaseAdminController
{
//    public function __construct(
//        TagService $tagService,
//        EntityManager $em
//    ) {
//        $this->em = $em;
//        $product = $this->em->getRepository('App:Product')->find(16);
////var_dump($product->getId());
////die();
//        $this->tagService = $tagService;
//        $similar = $this->tagService
//            ->setEntity($product)
//            ->setEntityType(Product::class)
//            ->similars();
//        print_r($similar);
//        die();
//    }

    public function repository($className)
    {
        return $this->getDoctrine()->getRepository($className);
    }


}
