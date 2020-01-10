<?php
namespace App\Service\Twig;

use App\Repository\LandingBlockRepository;

class Blocks
{
    /**
     * @var LandingBlockRepository
     */
    private $landingBlockRepository;

    public function __construct(LandingBlockRepository $landingBlockRepository)
    {
        $this->landingBlockRepository = $landingBlockRepository;
    }

    public function getAll()
    {
        return $this->landingBlockRepository->findAll();
    }
}