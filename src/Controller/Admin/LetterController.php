<?php

namespace App\Controller\Admin;

use App\Mailer\Mailer;
use App\Repository\OrdersRepository;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AdminController as BaseAdminController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class LetterController extends BaseAdminController
{
    /**
     * @Route("/admin/letter/test", methods={"POST","GET","HEAD"})
     */
    public function test(Mailer $mailer, OrdersRepository $ordersRepository)
    {
        $mailer->sendOrderCreateEmail($ordersRepository->find(50));
        return $this->render('admin/letter/empty.html.twig', []);
    }
}