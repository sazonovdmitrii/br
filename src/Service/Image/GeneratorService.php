<?php
namespace App\Service\Image;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use App\Service\EnvService;
use Impulze\Bundle\InterventionImageBundle\ImageManager;
use WebPConvert\WebPConvert;

class GeneratorService extends AbstractController
{
    private $image;

    private $types;

    private $config;

    private $manager;

    private $envService;

    private $imageManager;

    public function __construct(
        EnvService $envService,
        ImageManager $imageManager
    ) {
        $this->envService = $envService;
        $this->imageManager = $imageManager;
    }

    /**
     * @return mixed
     */
    public function getManager()
    {
        return $this->imageManager;
    }

    /**
     * @return mixed
     */
    public function getImage()
    {
        return $this->image;
    }

    /**
     * @param $image
     * @return $this
     */
    public function setImage($image)
    {
        $this->image = $image;
        return $this;
    }

    /**
     * @return mixed
     */
    public function getTypes()
    {
        return $this->types;
    }

    /**
     * @param $types
     * @return $this
     */
    public function setTypes($types)
    {
        $this->types = $types;
        return $this;
    }

    /**
     * @return mixed
     */
    public function getConfig()
    {
        return $this->config;
    }

    /**
     * @param $config
     * @return $this
     */
    public function setConfig($config)
    {
        $this->config = $config;
        return $this;
    }

    public function getAll()
    {
        $result = [];

        $imagePath = $this->envService->getBasePath() .  '/public' . $this->getImage()->getPath();

        $pathInfo = pathinfo($imagePath);

        if($extension = $pathInfo['extension']) {
            foreach(array_keys($this->getConfig()) as $imageSizeType) {

                $typeDir = $pathInfo['dirname'] . '/' . $imageSizeType;

                if(!file_exists($typeDir)) {
                    mkdir($typeDir);
                }

                $newImagePath = $typeDir . '/' . $pathInfo['basename'];

                foreach($this->getTypes() as $imageType) {
                    $path = '';
                    switch($imageType) {

                        case 'webp':
                            $path = $typeDir . '/' . $pathInfo['filename'] . '.webp';

                            if(!file_exists($path)) {
                                WebPConvert::convert($newImagePath, $path, []);
                            }

                            break;

                        default:
                            if(!file_exists($newImagePath)) {
                                $image = $this->getManager()
                                    ->configure(['driver' => 'imagick'])
                                    ->make($imagePath)
                                    ->resize(
                                        $this->getConfig()[$imageSizeType]['width'],
                                        $this->getConfig()[$imageSizeType]['height'], function ($constraint) {
                                            $constraint->aspectRatio();
                                        }
                                    );
                                $image->save($newImagePath);
                            }
                            $path = $newImagePath;
                    }

                    $result[$imageSizeType][$imageType][] = str_replace(
                        $this->envService->getBasePath(), $this->envService->getBaseUrl(), $path
                    );
                }
            }
        }
        return $result;
    }
}