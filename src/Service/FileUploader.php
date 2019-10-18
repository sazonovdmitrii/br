<?php

namespace App\Service;

use Symfony\Component\HttpFoundation\File\Exception\FileException;
use Symfony\Component\HttpFoundation\File\UploadedFile;

class FileUploader
{
    private $targetDirectory;

    public function __construct($targetDirectory)
    {
        $this->targetDirectory = $targetDirectory;
    }

    public function upload(UploadedFile $file)
    {
        $originalFilename = pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME);
        $safeFilename = md5($originalFilename . time());
        $fileName         = $safeFilename . '-' . uniqid() . '.' . $file->guessExtension();

        try {
            $file->move($this->getTargetDirectory(), $fileName);
        } catch (FileException $e) {

        }

        return $fileName;
    }

    public function setTargetDirectory($targetDirectory)
    {
        $this->targetDirectory = $targetDirectory;
        return $this;
    }

    public function getTargetDirectory()
    {
        return $this->targetDirectory;
    }
}