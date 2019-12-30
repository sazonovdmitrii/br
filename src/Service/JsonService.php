<?php
namespace App\Service;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Doctrine\ORM\EntityManager;

class JsonService extends AbstractController
{
    private $entityManager;

    private $data;

    private $dir;

    private $locale;

    private $localeDir;

    public function __construct($localeDir, EntityManager $entityManager)
    {
        $this->entityManager = $entityManager;
        $this->localeDir = $localeDir;
    }

    public function setData(array $data)
    {
        $this->data = $data;
        return $this;
    }

    public function getData()
    {
        return $this->data;
    }

    public function setLocale(string $locale)
    {
        $this->locale = $locale;
        return $this;
    }

    public function getLocale()
    {
        return $this->locale;
    }

    public function generate()
    {
        if(!$this->getData()) {
            return false;
        }

        $data = [];
        foreach($this->getData() as $item) {
            $data[$item->getSource()] = $item->getGoal();
        }

        if(!file_exists($this->localeDir)) {
            $this->_createDir($this->localeDir);
        }
	$filePath = $this->localeDir . $this->getLocale() . '.json';
        file_put_contents($filePath, json_encode($data));
    }

    private function _createDir($path)
    {
        return mkdir($path, 0777, true);
    }
}
