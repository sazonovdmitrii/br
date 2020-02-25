<?php

namespace App\Controller\Admin;

use App\Repository\ProductItemRepository;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AdminController as BaseAdminController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Doctrine\ORM\EntityManager;

class ImportController extends BaseAdminController
{
    private $_template = 'admin/Import/form.html.twig';

    /**
     * @var ProductItemRepository
     */
    private $productItemRepository;
    /**
     * @var EntityManager
     */
    private $entityManager;

    /**
     * ImportController constructor.
     *
     * @param ProductItemRepository $productItemRepository
     * @param EntityManager $entityManager
     */
    public function __construct(
        ProductItemRepository $productItemRepository,
        EntityManager $entityManager
    ) {
        $this->productItemRepository = $productItemRepository;
        $this->entityManager = $entityManager;
    }

    protected function renderTemplate($actionName, $templatePath, array $parameters = array())
    {
        return $this->render($this->_template, $parameters);
    }

    public function exportAction()
    {
        $locales = $this->getParameter('a2lix_translation_form.locales');
        $names[] = [
            'id'
        ];
        foreach ($locales as $locale) {
            $names[0][] = 'Item Name ' . strtoupper($locale);
            $names[0][] = 'Product Name ' . strtoupper($locale);
        }
        $i = 0;
        foreach ($this->productItemRepository->findAll() as $productItem) {
            $i++;
            $names[$i] = [];
            foreach ($locales as $locale) {
                $productItem->setCurrentLocale($locale);
                $names[$i]['id']                   = $productItem->getId();
                $names[$i]['item_name_' . $locale] = $productItem->getName();
                if ($product = $productItem->getProduct()) {
                    $names[$i]['product_name_' . $locale] = $product->getName();
                }
            }

        }

        $fileName = 'export.csv';
        $filePath = $this->getParameter('kernel.project_dir') . '/public/uploads/' . $fileName;
        $fp       = fopen($filePath, 'w');

        foreach ($names as $fields) {
            fputcsv($fp, $fields);
        }

        $response = new Response();
        $response->headers->set('Content-type', 'text/csv');
        $response->headers->set('Cache-Control', 'private');
        $response->headers->set('Content-Disposition', 'attachment; filename="' . $filePath . '";');
        $response->sendHeaders();
        $response->setContent(file_get_contents($filePath));
        return $response;
    }

    /**
     * @Route("/admin/import", methods={"POST","HEAD"})
     */
    public function import(Request $request)
    {
        $csv = array_map(
            'str_getcsv', explode(
                PHP_EOL, file_get_contents(
                    $request->files->get('export')
                )
            )
        );

        $locales = $this->getParameter('a2lix_translation_form.locales');

        foreach($csv as $line) {
            if($id = intval($line[0])) {
                $item = $this->productItemRepository->find($id);
                $countItemLocale = 1;
                $countProductLocale = 2;
                foreach($locales as $locale) {
                    if(isset($line[$countItemLocale]) && isset($line[$countProductLocale])) {
                        $item->translate($locale)->setName($line[$countItemLocale]);
                        $countItemLocale += 2;
                        if($product = $item->getProduct()) {
                            $product->translate($locale)->setName($line[$countProductLocale]);
                            $countProductLocale += 2;
                        }
                    }
                }
                $item->mergeNewTranslations();
                $this->entityManager->persist($item);
            }
        }
        $this->entityManager->flush();

        return $this->redirect('/admin');
    }
}
