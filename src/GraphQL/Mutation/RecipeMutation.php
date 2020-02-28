<?php

namespace App\GraphQL\Mutation;

use App\Repository\RecipeRepository;
use App\Service\AuthenticatorService;
use App\Service\LenseService;
use App\Service\UserService;
use Doctrine\ORM\EntityManager;
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;
use Overblog\GraphQLBundle\Definition\Argument;
use Overblog\GraphQLBundle\Error\UserError;
use Redis;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Symfony\Component\Form\Forms;
use App\GraphQL\Input\NewRecipeInput;
use App\GraphQL\Input\UpdateRecipeInput;
use App\GraphQL\Input\EntityIdInput;
use App\Entity\Recipe;

class RecipeMutation extends AuthMutation
{
    /**
     * @var EntityManager
     */
    private $entityManager;
    /**
     * @var RecipeRepository
     */
    private $recipeRepository;
    /**
     * @var LenseService
     */
    private $lenseService;

    public function __construct(
        Redis $redis,
        ContainerInterface $container,
        AuthenticatorService $authenticatorService,
        UserService $userService,
        EntityManager $entityManager,
        RecipeRepository $recipeRepository,
        LenseService $lenseService
    ) {
        parent::__construct($redis, $container, $authenticatorService, $userService);

        if(!$this->getUser()) {
            throw new UserError('Authorization required');
        }
        $this->entityManager = $entityManager;
        $this->recipeRepository = $recipeRepository;
        $this->lenseService = $lenseService;
    }

    public function add(Argument $args)
    {
        $input = new NewRecipeInput($args);

        $recipe = new Recipe();
        $recipe->setRecipe($input->recipe);
        $recipe->setCustomer($this->getUser());

        $this->entityManager->persist($recipe);
        $this->entityManager->flush();

        return [
            'id' => $recipe->getId(),
            'recipe' => $this->lenseService->parse($input->recipe)
        ];
    }

    public function update(Argument $args)
    {
        $input = new UpdateRecipeInput($args);

        if(!$input->id) {
            throw new UserError('Field identifier is required');
        }

        $recipe = $this->recipeRepository->find($input->id);
        $recipe->setRecipe($input->recipe);

        $this->entityManager->persist($recipe);
        $this->entityManager->flush();

        return [
            'id' => $recipe->getId(),
            'recipe' => $this->lenseService->parse($recipe->getRecipe())
        ];

        return $recipe;
    }

    public function delete(Argument $args)
    {
        $input = new EntityIdInput($args);

        if(!$input->id) {
            throw new UserError('Field identifier is required');
        }

        $recipe = $this->recipeRepository->find($input->id);

        $this->entityManager->remove($recipe);
        $this->entityManager->flush();

        return [
            'id' => $input->id
        ];
    }
}