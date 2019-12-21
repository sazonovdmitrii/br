<?php

namespace App\Controller\Admin;

use App\Entity\Translation;
use App\Repository\TranslationRepository;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AdminController as BaseAdminController;
use EasyCorp\Bundle\EasyAdminBundle\Event\EasyAdminEvents;
use Symfony\Component\HttpFoundation\JsonResponse;
use Doctrine\ORM\EntityManager;
use Symfony\Component\HttpFoundation\Response;
use App\Service\JsonService;

class TranslationController extends BaseAdminController
{
    private $entityManager;

    private $jsonService;
    /**
     * @var TranslationRepository
     */
    private $translationRepository;

    public function __construct(
        EntityManager $entityManager,
        JsonService $jsonService,
        TranslationRepository $translationRepository
    ) {
        $this->entityManager = $entityManager;
        $this->jsonService = $jsonService;
        $this->translationRepository = $translationRepository;
    }

    public function listTranslationAction()
    {
        $this->dispatch(EasyAdminEvents::PRE_LIST);

        $fields = $this->entity['list']['fields'];
        $paginator = $this->findAll($this->entity['class'], $this->request->query->get('page', 1), $this->entity['list']['max_results'], $this->request->query->get('sortField'), $this->request->query->get('sortDirection'), $this->entity['list']['dql_filter']);

        $data = $this->translationRepository->findAll();

        $this->dispatch(EasyAdminEvents::POST_LIST, array('paginator' => $paginator));

        $parameters = array(
            'paginator' => $paginator,
            'fields' => $fields,
            'data' => $data,
            'delete_form_template' => $this->createDeleteForm($this->entity['name'], '__id__')->createView(),
        );

        return $this->executeDynamicMethod('render<EntityName>Template', array('list', 'admin/Translation/page.html.twig', $parameters));
    }

    public function createTranslationAction()
    {
        $requestData = $this->request->request;

        $translation = new Translation();
        $translation->setSource($requestData->get('source'));
        $translation->setGoal($requestData->get('goal'));
        $translation->setLanguage($requestData->get('language'));

        $this->entityManager->persist($translation);
        $this->entityManager->flush();

        return new JsonResponse(['response' => 200]);
    }

    protected function deleteTranslationAction()
    {
        $this->dispatch(EasyAdminEvents::PRE_DELETE);

        $id = $this->request->query->get('id');
        $form = $this->createDeleteForm($this->entity['name'], $id);
        $form->handleRequest($this->request);

        $easyadmin = $this->request->attributes->get('easyadmin');
        $entity = $easyadmin['item'];

        $this->dispatch(EasyAdminEvents::PRE_REMOVE, array('entity' => $entity));

        $this->executeDynamicMethod('preRemove<EntityName>Entity', array($entity, true));

        try {
            $this->executeDynamicMethod('remove<EntityName>Entity', array($entity, $form));
        } catch (ForeignKeyConstraintViolationException $e) {
            throw new EntityRemoveException(array('entity_name' => $this->entity['name'], 'message' => $e->getMessage()));
        }

        $this->dispatch(EasyAdminEvents::POST_REMOVE, array('entity' => $entity));

        $this->dispatch(EasyAdminEvents::POST_DELETE);

        return $this->redirectToReferrer();
    }

    public function generateAction()
    {
        $locales = $this->getParameter('a2lix_translation_form.locales');
        foreach($locales as $locale) {

            $languages = $this->translationRepository->findBy(['language' => $locale]);

            $this->jsonService
                ->setData($languages)
                ->setLocale($locale)
                ->generate();
        }
        return $this->redirect($this->generateUrl('easyadmin', array('action' => 'list', 'entity' => $this->entity['name'])));
    }
}
