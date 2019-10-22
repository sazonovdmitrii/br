# Intervention Image Bundle
A very simple Symfony Bundle that wraps around the [Intervention Image](http://image.intervention.io) ImageManager.

## Requirements
### Bundle
Bundle is set at Symfony 3.4 but I have not tested this as this bundle was created for personal use I have only used it in flex projects (4+), however from what I can tell the latest required feature it uses is autowiring so I moved it down.

### Intervention Image
Quoted from [Intervention Image](http://image.intervention.io/getting_started/installation):

Intervention Image requires the following components to work correctly.
* PHP >= 5.4
* Fileinfo Extension

And one of the following image libraries.
* GD Library (>=2.0) … or …
* Imagick PHP extension (>=6.5.7)

## Install
    composer require impulze/intervention-image-bundle

## Usage
### Bundle
```PHP
use Impulze\Bundle\InterventionImageBundle\ImageManager;

...

// Get service from container:
$manager = $container->get(ImageManager::class);

...

// Or use symfony autowiring
public function __construct(ImageManager $manager)
{
	$image = $manager->make('public/foo.jpg')->resize(300, 200);

	...
}
```

### Intervention Image
For all features that come with Intervention Image check their own [documentation](http://image.intervention.io).

## Configuration

This bundle allows for the following configuration:

```YAML
intervention_image:
    driver: gd # or imagick, defaults to gd
```
