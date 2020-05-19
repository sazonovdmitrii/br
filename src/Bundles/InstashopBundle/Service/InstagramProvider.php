<?php
/**
 * Разработчик: Харсеев Владимир Александрович
 * Email: vkharseev@gmail.com
 * Последнее обновление: 30.04.2020.
 */

namespace App\Bundles\InstashopBundle\Service;

use Symfony\Component\HttpClient\HttpClient;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Contracts\HttpClient\Exception\{ServerExceptionInterface,
    ClientExceptionInterface,
    TransportExceptionInterface,
    RedirectionExceptionInterface};

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

    /**
     * Refresh a Long-Lived Token
     *
     * @throws ClientExceptionInterface
     * @throws RedirectionExceptionInterface
     * @throws ServerExceptionInterface
     * @throws TransportExceptionInterface
     */
    private function refresh(): void
    {
        $url = sprintf(
            'https://graph.instagram.com/refresh_access_token?grant_type=ig_refresh_token&access_token=%s',
            $this->token
        );
        $client = HttpClient::create();
        $response = $client->request('GET', $url);
        if ($response->getStatusCode() === Response::HTTP_OK) {
            $this->token = $response->getContent();
        }
    }

    /**
     * Узел User
     *
     * @param string $userId
     * @return string|null
     * @throws ClientExceptionInterface
     * @throws RedirectionExceptionInterface
     * @throws ServerExceptionInterface
     * @throws TransportExceptionInterface
     */
    private function profile(string $userId = 'me'): ?string
    {
        $url = sprintf(
            'https://graph.instagram.com/%s?fields=id,username&access_token=%s',
            $userId,
            $this->token
        );
        $client = HttpClient::create();
        $response = $client->request('GET', $url);
        if ($response->getStatusCode() === Response::HTTP_OK) {
            return $response->getContent();
        }
        return null;
    }

    /**
     * Поиск User
     *
     * @param string $nickname
     * @return string|null
     * @throws ClientExceptionInterface
     * @throws RedirectionExceptionInterface
     * @throws ServerExceptionInterface
     * @throws TransportExceptionInterface
     */
    private function search(string $nickname): ?string
    {
        $url = sprintf(
            'https://api.instagram.com/v1/users/search?q=%s&access_token=%s',
            $nickname,
            $this->token
        );
        $client = HttpClient::create();
        $response = $client->request('GET', $url);
        if ($response->getStatusCode() === Response::HTTP_OK) {
            return $response->getContent(false);
        }
        return null;
    }
}