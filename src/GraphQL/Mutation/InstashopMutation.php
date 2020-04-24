<?php

namespace App\GraphQL\Mutation;

use Overblog\GraphQLBundle\Definition\Resolver\MutationInterface;
use App\GraphQL\Input\InstashopClickInput;
use App\GraphQL\Input\InstashopPurchasesInput;
use Overblog\GraphQLBundle\Definition\Argument;
use App\Bundles\InstashopBundle\Controller\ApiController;

/**
 * Class InstashopMutation
 *
 * @package App\GraphQL\Mutation
 */
class InstashopMutation implements MutationInterface
{
    /**
     * @var ApiController
     */
    private $apiController;

    /**
     * InstashopMutation constructor.
     *
     * @param ApiController $apiController
     */
    public function __construct(ApiController $apiController)
    {
        $this->apiController = $apiController;
    }

    /**
     * @param Argument $args
     * @return array
     */
    public function click(Argument $args)
    {
        $input = new InstashopClickInput($args);

        $this->apiController->click($input->id);

        return [
            'success' => true,
            'message' => ''
        ];
    }

    /**
     * @param Argument $args
     * @return array
     */
    public function purchases(Argument $args)
    {
        $input = new InstashopPurchasesInput($args);

        $this->apiController->purchases(explode(',', $input->ids));

        return [
            'success' => true,
            'message' => ''
        ];
    }
}