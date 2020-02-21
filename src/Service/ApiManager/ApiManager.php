<?php
namespace App\Service\ApiManager;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpClient\HttpClient;

class ApiManager extends AbstractController implements ApiManagerInterface
{
    /**
     * @var
     */
    private $_method;

    /**
     * @var
     */
    private $_url;

    /**
     * @var
     */
    private $_headers;

    /**
     * @var
     */
    private $_content;

    /**
     * @var
     */
    private $_params;

    /**
     * @param $url
     * @return $this
     */
    public function setUrl($url)
    {
        $this->_url = $url;
        return $this;
    }

    /**
     * @return mixed
     */
    public function getUrl()
    {
        return $this->_url;
    }

    /**
     * @param $method
     * @return $this
     */
    public function setMethod($method)
    {
        $this->_method = $method;
        return $this;
    }

    /**
     * @return mixed
     */
    public function getMethod()
    {
        return $this->_method;
    }

    /**
     * @param array $headers
     * @return $this
     */
    public function setHeaders(array $headers)
    {
        $this->_headers = $headers;
        return $this;
    }

    /**
     * @param array $content
     * @return $this
     */
    public function setContent(array $content)
    {
        $this->_content = $content;
        return $this;
    }

    /**
     * @return mixed
     */
    public function getHeaders()
    {
        return $this->_headers;
    }

    /**
     * @return mixed
     */
    public function getContent()
    {
        return $this->_content;
    }

    /**
     * @return mixed
     */
    private function getParams()
    {
        return $this->_params;
    }

    /**
     * @return string
     */
    public function getQueryParams()
    {
        if($this->getParams()) {
            return '?' . http_build_query($this->getParams());
        }
        return '';
    }

    /**
     * @param array $params
     * @return $this
     */
    public function setParams(array $params)
    {
        $this->_params = $params;
        return $this;
    }

    /**
     * @return int
     */
    public function getData()
    {
        $httpClient = HttpClient::create();

        $response = $httpClient->request(
            'POST', $this->getUrl() . $this->getMethod() . $this->getQueryParams(), [
                'headers' => $this->getHeaders(),
                'query' => $this->getContent()
            ]
        );

        if(200 != $response->getStatusCode()) {
            return [];
        }

        return json_decode($response->getContent(), true);
    }
}