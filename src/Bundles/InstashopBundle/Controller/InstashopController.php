<?php
/**
 * Разработчик: Харсеев Владимир Александрович
 * Email: vkharseev@gmail.com
 * Последнее обновление: 06.04.2020.
 */

namespace App\Bundles\InstashopBundle\Controller;


use Doctrine\ORM\EntityManager;
use Symfony\Component\HttpFoundation\Request;
use App\Bundles\InstashopBundle\Service\Instashop;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AdminController as BaseAdminController;

class InstashopController extends BaseAdminController
{
    /**
     * @var EntityManager
     */
    private $db;

    /**
     * InstashopController constructor.
     * @param EntityManager $db
     */
    public function __construct(EntityManager $db)
    {
        $this->db = $db;
    }

    public function search(Request $request, Instashop $service): void
    {
        dd($service->search());
    }
}