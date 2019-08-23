<?php
namespace App\Lp\CmsBundle\Controller;

use App\Entity\Address;
use App\Entity\Delivery;
use App\Entity\Product;
use App\Entity\ProductTag;
use App\Lp\Framework\LpController;
use App\Service\AdminTagService;
use App\Service\ProductService;
use Symfony\Component\HttpFoundation\Request;
use Psr\Log\LoggerInterface;
use Doctrine\ORM\EntityManager;
use App\Service\TagService;
use App\Service\UrlParseService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use App\Service\BeguService;
use Redis;
use Doctrine\Common\Persistence\ObjectManager;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use App\Service\ConfigService;
use App\Entity\Catalog;

class CmsController extends LpController
{
    protected $logger;
    private $tagService;
    private $em;
    private $urlParseService;
    private $beguService;
    private $redisService;
    private $productService;
    private $configService;
    private $adminTagService;

    public function __construct(
        LoggerInterface $logger,
        EntityManager $em,
        TagService $tagService,
        UrlParseService $urlParseService,
        BeguService $beguService,
        Redis $redisService,
        ObjectManager $manager,
        ValidatorInterface $validatorInterface,
        ProductService $productService,
        ConfigService $configService,
        AdminTagService $adminTagService
    ) {
        $this->logger = $logger;
        $this->tagService = $tagService;
        $this->em = $em;
        $this->urlParseService = $urlParseService;
        $this->beguService = $beguService;
        $this->redisService = $redisService;
        $this->manager = $manager;
        $this->validatorInterface = $validatorInterface;
        $this->productService = $productService;
        $this->configService = $configService;
        $this->adminTagService = $adminTagService;
    }

    /**
     * @Route("/{slug}", name="cms")
     */
    public function match(Request $request)
    {

        $productId = 1530;
        $product = $this->em->getRepository('App:Product')->find($productId);

//        foreach($similars as $similar) {
//            var_dump($similar->getName());
//        }

        die();

//        $similarProductsTagsIds = explode(',', $this->configService->get('extra_tags_similar_products'));

        foreach($requiredTagsIds as $requiredTagsId) {
            $productTagItem = $this->em->getRepository('App:ProductTagItem')->find($requiredTagsId);
            var_dump($requiredTagsId);
            die();
        }
//        print_r($requiredTags);
        die();

        $product = $this->em->getRepository('App:Product')->find(1530);

        $brand = $this->tagService
            ->setEntityType(Product::class)
            ->setEntity($product)
            ->setTagId($this->configService->get('brand_tag'))
            ->getOne();

        $aromat = $this->tagService
            ->setEntityType(Product::class)
            ->setEntity($product)
            ->setTagId($this->configService->get('fragrance_tag'))
            ->getOne();

        $catalog = $this->tagService
            ->setEntityType(Catalog::class)
            ->setTagId($aromat->getId())
            ->getOne();
        echo "<pre>";
//        $catalog->getProducts()->first();
//        var_dump(get_class($catalog->getProducts()));
//        print_r(get_class_methods($catalog->getProducts()));
//        die();
        foreach($catalog->getProducts()->slice(0, 2) as $product) {
            var_dump($product->getId());
            var_dump($product->getName());
        }
//        die();

//        echo "<pre>";
        print_r($aromat->getId());
        print_r($aromat->getName());
//        die();
//        $value = ;
//        var_dump($value);
        die();

        $relateds = $this->productService
            ->setProduct($product)
            ->relatedBrandProducts();
//        echo "<pre>";
//        print_r(get_class_methods($product));
        die();
//        var_dump('asdf');
//        die();
        $topMenu = $this->em->getRepository('App:Menu')->find(1);
        $result = [];
        if($topMenu->getMenu()) {
            $menu = json_decode($topMenu->getMenu(), true);
            $result = $menu[0]['children'];
        }
        echo "<pre>";
        print_r($result);
        die();
        return [
            'data' => $result
        ];

        echo "<pre>";
        print_r();
        die();

        echo '[
  { "id" : "demo_root_1", "text" : "Root 1", "children" : true, "type" : "root", "data": "adfasdfa" },
  { "id" : "demo_root_2", "text" : "Root 2", "type" : "root" }
]';
        die();
        $productItem = $this->em
            ->getRepository('App:ProductItem')
            ->find(24)
            ->getEntity()
            ->getProductUrls()
        ->first()
        ->getUrl();
        echo "<pre>";
        var_dump($productItem);
        die();
        $manager = $this->manager;

//        $delivery = new Delivery();
//        $delivery->setName('asdf123');
//        $delivery->setVisible(true);
//        var_dump($manager->persist($delivery));
//        var_dump($manager->flush());
//        var_dump($manager->)
//        die();
//


        $address = new Address();
        $address->setPerson('asdf asdf');
        $address->setName('asdf');
        $errors = $this->validatorInterface->validate($address);
        $manager->persist ( $address );
        $manager->flush ();
        var_dump($address->getId());
        die();
        echo "<pre>";
        print_r($errors);
        die();
//        try {
            $manager->persist ( $address );
            $manager->flush ();
        echo "<pre>";
        print_r(get_class_methods($manager));
        print_r(get_class_vars($manager));
        die();
//        } catch (Exception $e) {
//            echo $e->getMessage();
//            $theme = null;
//        }
        die('----');
        var_dump($manager->persist($address));
        var_dump($manager->flush());
        die('asdf');
        $data = $this->beguService
            ->setMethod('pickup/cities-pvz')
            ->getData();
        $this->redisService->set('pickup/cities-pvz', $data);
        var_dump('----');
        $pvz = $this->redisService->get('pickup/cities-pvz');
        echo "<pre>";
        print_r(json_decode($pvz, true)['data'][0]);
        die();
//        echo "<pre>";
//        print_r($data);
//        die();
//        var_dump($this->beguService->getData());
//        die();

//// $statusCode = 200
//        $contentType = $response->getHeaders()['content-type'][0];
//// $contentType = 'application/json'
//        $content = $response->getContent();
//// $content = '{"id":521583, "name":"symfony-docs", ...}'
//        $content = $response->toArray();
//// $content = ['id' => 521583, 'name' => 'symfony-docs', ...]
////        $url = '';
//
//
//
//
//
//
////        die(var_dump($catalogUrl->getId()));
//        echo "<pre>";
//        $filters = $this->tagService
//            ->setEntity(ProductTag::class)
//            ->getFilters();
//        print_r($filters);
//        die();
//
//
//        $catalog = $catalogUrl->getEntity();
//        $productTags = [];
//        foreach($catalog->getProducts() as $product) {
//            foreach($product->getProducttagitem() as $productTag) {
//                $tagId = $productTag->getId();
//                if(isset($tags[$tagId])) {
//                    $productTags[$tagId] += 1;
//                } else {
//                    $productTags[$tagId] = 1;
//                }
//            }
//        }






//            echo "<pre>";
//            print_r($tags);
//            die();
//            var_dump($catalog->getProducts()->count());
//            echo "<pre>";
//            print_r(get_class_methods($catalog));
//            die();
//        die('--');


//        $catalogId = 258;
//        $catalog = $this
//            ->getDoctrine()
//            ->getRepository('App:Catalog')
//            ->find($catalogId);
//        foreach($catalog->getProducts() as $product) {
//            var_dump($product->getId());
//        }
//        die();
//        echo "<pre>";
//        print_r();
//        print_r(get_class_methods($catalog));
//        die();
//        echo "<pre>";
//        print_r(get_class_methods($productUrl->getEntity()));
//        die();
//        var_dump($productUrl->getEntityId());
//        die();

        return $this->render('root/index.html.twig', [
            'controller_name' => 'CmsController',
        ]);
    }
}
