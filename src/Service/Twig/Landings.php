<?php
namespace App\Service\Twig;

use App\Repository\LandingBlockRepository;

/**
 * Class Landings
 *
 * @package App\Service\Twig
 */
class Landings
{
    /**
     * @var LandingBlockRepository
     */
    private $landingBlockRepository;

    /**
     * Landings constructor.
     *
     * @param LandingBlockRepository $landingBlockRepository
     */
    public function __construct(LandingBlockRepository $landingBlockRepository)
    {
        $this->landingBlockRepository = $landingBlockRepository;
    }

    /**
     * @return \App\Entity\LandingBlock[]
     */
    public function findAllBlocks()
    {
        return $this->landingBlockRepository->findAll();
    }
}