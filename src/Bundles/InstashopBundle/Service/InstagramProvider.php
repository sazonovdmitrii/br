<?php
/**
 * Разработчик: Харсеев Владимир Александрович
 * Email: vkharseev@gmail.com
 * Последнее обновление: 30.04.2020.
 */

namespace App\Bundles\InstashopBundle\Service;

use Symfony\Component\HttpClient\HttpClient;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Contracts\HttpClient\Exception\ServerExceptionInterface;
use Symfony\Contracts\HttpClient\Exception\ClientExceptionInterface;
use Symfony\Contracts\HttpClient\Exception\TransportExceptionInterface;
use Symfony\Contracts\HttpClient\Exception\RedirectionExceptionInterface;

/**
 * Class InstagramProvider
 *
 * @package App\Bundles\InstashopBundle\Service
 */
class InstagramProvider implements ProviderInterface
{
    private $query;
    /**
     * @var string
     */
    private $secret;
    /**
     * @var string|null
     */
    private $token;

    public function __construct(string $secret = null, string $token = null)
    {
        $this->secret = $secret;
        $this->token = $token;
    }

    /**
     * @return array
     * @throws ClientExceptionInterface
     * @throws RedirectionExceptionInterface
     * @throws ServerExceptionInterface
     * @throws TransportExceptionInterface
     */
    public function get(): array
    {
        $url = sprintf(
            'https://graph.instagram.com/v1/tags/%s/media/recent?access_token=%s',
            $this->query,
            $this->token
        );
        $client = HttpClient::create();
        $response = $client->request('GET', $url, [
            'headers' => [
                'Content-Type' => 'application/json',
            ],
        ]);
        if ($response->getStatusCode() === Response::HTTP_OK) {
            $content = $response->getContent();
        }
        return [];
    }

    /**
     * @param string $query
     * @return ProviderInterface
     */
    public function setQueryString(string $query): ProviderInterface
    {
        $this->query = preg_replace('/^#/', '', mb_strtolower(trim($query)));
        return $this;
    }

    /**
     * @return string
     */
    public function getName(): string
    {
        return 'instagram';
    }
}