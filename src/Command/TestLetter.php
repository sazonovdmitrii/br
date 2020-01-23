<?php
namespace App\Command;

use App\Mailer\Mailer;
use App\Repository\UsersRepository;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Console\Command\Command;

class TestLetter extends Command
{
    protected static $defaultName = 'swiftmailer:testletter';
    /**
     * @var Mailer
     */
    private $mailer;
    /**
     * @var UsersRepository
     */
    private $usersRepository;

    protected function configure()
    {
        $this
            ->setDescription('Test Letter')
            ->setHelp('Restore Password Test Letter');
    }

    public function __construct(Mailer $mailer, UsersRepository $usersRepository)
    {
        $this->mailer = $mailer;
        $this->usersRepository = $usersRepository;
        parent::__construct();
    }

    protected function execute(InputInterface $input, OutputInterface $output)
    {
        $this->mailer->sendRestorePasswordEmail($this->usersRepository->find(1));
        $output->writeln('Success');
    }
}