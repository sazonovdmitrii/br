<?php

namespace App\Controller\Admin;

use App\Entity\Catalog;
use App\Entity\CatalogUrl;
use App\Service\AdminTagService;
use App\Service\CatalogService;
use Doctrine\ORM\EntityManager;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AdminController as BaseAdminController;
use EasyCorp\Bundle\EasyAdminBundle\Event\EasyAdminEvents;
use Symfony\Component\HttpFoundation\Response;

class CatalogController extends BaseAdminController
{
    private $tagService;

    private $entityManager;

    private $catalogService;

    public function __construct(
        AdminTagService $tagService,
        EntityManager $entityManager,
        CatalogService $catalogService
    ) {
        $this->tagService     = $tagService;
        $this->entityManager  = $entityManager;
        $this->catalogService = $catalogService;
    }

    /**
     * The method that is executed when the user performs a 'edit' action on an entity.
     *
     * @return Response|RedirectResponse
     */
    protected function editAction()
    {
        $this->dispatch(EasyAdminEvents::PRE_EDIT);

        $id        = $this->request->query->get('id');
        $easyadmin = $this->request->attributes->get('easyadmin');
        $entity    = $easyadmin['item'];

        if ($tags = $this->tagService->parseRequest($this->request->request->all())) {
            $this->tagService
                ->setTags($tags)
                ->setEntityType(Catalog::class)
                ->setEntity($entity)
                ->update();
        }
        if ($urlsIds = $this->request->request->get('url')) {
            $this->catalogService
                ->setCatalog($entity)
                ->updateCatalogUrls($urlsIds);
        }

        if ($this->request->isXmlHttpRequest() && $property = $this->request->query->get('property')) {
            $newValue       = 'true' === mb_strtolower($this->request->query->get('newValue'));
            $fieldsMetadata = $this->entity['list']['fields'];

            if (!isset($fieldsMetadata[$property]) || 'toggle' !== $fieldsMetadata[$property]['dataType']) {
                throw new \RuntimeException(sprintf('The type of the "%s" property is not "toggle".', $property));
            }
            $this->updateEntityProperty($entity, $property, $newValue);

            // cast to integer instead of string to avoid sending empty responses for 'false'
            return new Response((int)$newValue);
        }

        $fields = $this->entity['edit']['fields'];

        $editForm   = $this->executeDynamicMethod('create<EntityName>EditForm', array($entity, $fields));
        $deleteForm = $this->createDeleteForm($this->entity['name'], $id);

        $editForm->handleRequest($this->request);
        if ($editForm->isSubmitted() && $editForm->isValid()) {
            $this->dispatch(EasyAdminEvents::PRE_UPDATE, array('entity' => $entity));

            $this->executeDynamicMethod('preUpdate<EntityName>Entity', array($entity, true));
            $this->executeDynamicMethod('update<EntityName>Entity', array($entity, $editForm));

            $this->dispatch(EasyAdminEvents::POST_UPDATE, array('entity' => $entity));

            return $this->redirectToReferrer();
        }

        $this->dispatch(EasyAdminEvents::POST_EDIT);

        $parameters = array(
            'form'          => $editForm->createView(),
            'entity_fields' => $fields,
            'entity'        => $entity,
            'delete_form'   => $deleteForm->createView(),
        );

        return $this->executeDynamicMethod('render<EntityName>Template', array('edit', $this->entity['templates']['edit'], $parameters));
    }

    protected function newAction()
    {
        $this->dispatch(EasyAdminEvents::PRE_NEW);

        $entity = $this->executeDynamicMethod('createNew<EntityName>Entity');

        $easyadmin         = $this->request->attributes->get('easyadmin');
        $easyadmin['item'] = $entity;
        $this->request->attributes->set('easyadmin', $easyadmin);

        $fields = $this->entity['new']['fields'];

        $newForm = $this->executeDynamicMethod('create<EntityName>NewForm', array($entity, $fields));

        $newForm->handleRequest($this->request);
        if ($newForm->isSubmitted() && $newForm->isValid()) {
            $this->dispatch(EasyAdminEvents::PRE_PERSIST, array('entity' => $entity));

            $this->executeDynamicMethod('prePersist<EntityName>Entity', array($entity, true));
            $this->executeDynamicMethod('persist<EntityName>Entity', array($entity, $newForm));

            $this->dispatch(EasyAdminEvents::POST_PERSIST, array('entity' => $entity));
            if ($tags = $this->tagService->parseRequest($this->request->request->all())) {
                $this->tagService
                    ->setTags($tags)
                    ->setEntityType(Catalog::class)
                    ->setEntity($entity)
                    ->update();
            }

            if ($urlsIds = $this->request->request->get('url')) {
                $this->catalogService
                    ->setCatalog($entity)
                    ->updateCatalogUrls(
                        $this->request->request->get('url')
                    );
            }

            return $this->redirectToReferrer();
        }

        $this->dispatch(EasyAdminEvents::POST_NEW, array(
            'entity_fields' => $fields,
            'form'          => $newForm,
            'entity'        => $entity,
        )
        );

        $parameters = array(
            'form'          => $newForm->createView(),
            'entity_fields' => $fields,
            'entity'        => $entity,
        );

        return $this->executeDynamicMethod('render<EntityName>Template', array('new', $this->entity['templates']['new'], $parameters));
    }

    protected function addUrlAction()
    {
        $url = $this->request->request->get('url');

        $checkUrl = $this->entityManager->getRepository('App:CatalogUrl')->findOneBy(
            ['url' => $url]
        );

        if ($checkUrl) {
            $id = $checkUrl->getId();
        } else {
            $catalogUrl = new CatalogUrl();
            $catalogUrl->setUrl($url);

            $this->entityManager->persist($catalogUrl);
            $this->entityManager->flush();

            $id = $catalogUrl->getId();
        }


        $response = new Response();
        $response->setContent(json_encode([
            'id' => $id
        ]
        )
        );
        $response->headers->set('Content-Type', 'application/json');
        return $response;
    }


    protected function deleteUrlAction()
    {
        $urlId = $this->request->request->get('url_id');

        $url = $this->entityManager->getRepository('App:CatalogUrl')
            ->find($urlId);

        if ($url) {
            $this->entityManager->remove($url);
            $this->entityManager->flush();
        }

        $response = new Response();
        $response->setContent(json_encode([
                    'id' => $urlId
                ]
            )
        );
        $response->headers->set('Content-Type', 'application/json');
        return $response;
    }
}
