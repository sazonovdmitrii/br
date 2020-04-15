<?php
/**
 * Разработчик: Харсеев Владимир Александрович
 * Email: vkharseev@gmail.com
 * Последнее обновление: 15.04.2020.
 */

namespace App\Bundles\InstashopBundle\Service;

/**
 * Class ArrayProvider
 *
 * @package App\Bundles\InstashopBundle\Service
 */
class ArrayProvider implements ProviderInterface
{
    /**
     * @return array
     */
    public function get(): array
    {
        return [
            [
                'id'   => 1,
                'path' => 'https://scontent-ort2-1.xx.fbcdn.net/v/t51.2885-15/92188263_839921929840399_2444735778442242563_n.jpg?_nc_cat=102&_nc_sid=8ae9d6&_nc_ohc=iaBWgMgxJVgAX_ASD4Z&_nc_ht=scontent-ort2-1.xx&oh=06ace6f2b3ba5a344971f397aa0ab354&oe=5EAE55A2',
            ],
            [
                'id'   => 2,
                'path' => 'https://scontent-ort2-1.xx.fbcdn.net/v/t51.2885-15/91625457_245009560008515_1520977058990901509_n.jpg?_nc_cat=100&_nc_sid=8ae9d6&_nc_ohc=277LllZ550sAX_Kb39E&_nc_ht=scontent-ort2-1.xx&oh=75d8f435bc0f5383bfa7d9e5be63fce9&oe=5EAB7403',
            ],
            [
                'id'   => 3,
                'path' => 'https://scontent-ort2-1.xx.fbcdn.net/v/t51.2885-15/91338681_650001205840446_7228687503641724895_n.jpg?_nc_cat=101&_nc_sid=8ae9d6&_nc_ohc=6zQ14Bgl8XEAX9EMAWb&_nc_ht=scontent-ort2-1.xx&oh=f240dfeeac58fef446f5ce048b71242b&oe=5EACFD23',
            ],
            [
                'id'   => 4,
                'path' => 'https://scontent-ort2-1.xx.fbcdn.net/v/t51.2885-15/91602441_830074470831460_5820934742960323412_n.jpg?_nc_cat=108&_nc_sid=8ae9d6&_nc_ohc=wr6J7HDscsoAX9-bGqA&_nc_ht=scontent-ort2-1.xx&oh=67f4012be89f05851123a4a9b82b944f&oe=5EAAFB88',
            ],
            [
                'id'   => 5,
                'path' => 'https://scontent-ort2-1.xx.fbcdn.net/v/t51.2885-15/91398120_145033573663411_626395547040573333_n.jpg?_nc_cat=110&_nc_sid=8ae9d6&_nc_ohc=ggKlKgSkVTEAX-bwzcm&_nc_ht=scontent-ort2-1.xx&oh=0ee758cde5f619d5e7b711581e3512ac&oe=5EAAB313',
            ],
            [
                'id'   => 6,
                'path' => 'https://scontent-ort2-1.xx.fbcdn.net/v/t51.2885-15/91794657_280632679592500_2508123901448927166_n.jpg?_nc_cat=103&_nc_sid=8ae9d6&_nc_ohc=H6yh0izHl6IAX9TRLCA&_nc_ht=scontent-ort2-1.xx&oh=933f26b9f8a46aa6289735e64f42472a&oe=5EACAE08',
            ],
            [
                'id'   => 7,
                'path' => 'https://scontent-ort2-1.xx.fbcdn.net/v/t51.2885-15/91478539_2750561448563716_1523198115500628068_n.jpg?_nc_cat=106&_nc_sid=8ae9d6&_nc_ohc=rVEeMdiiTBUAX8jBKm6&_nc_ht=scontent-ort2-1.xx&oh=a9fba11a262a746ddfe42effac4d8aa8&oe=5EAC9555',
            ],
            [
                'id'   => 8,
                'path' => 'https://scontent-ort2-1.xx.fbcdn.net/v/t51.2885-15/91380985_2851549974882276_729669200353206506_n.jpg?_nc_cat=100&_nc_sid=8ae9d6&_nc_ohc=EXW9Oe6818kAX_YAD6Z&_nc_ht=scontent-ort2-1.xx&oh=8463907faa4fc656c0b23add77b7f7fb&oe=5EAC0BEC',
            ],
        ];
    }

    /**
     * @param string $query
     * @return ProviderInterface
     */
    public function setQueryString(string $query): ProviderInterface
    {
        return $this;
    }

    /**
     * @return string
     */
    public function getName(): string
    {
        return 'array';
    }
}