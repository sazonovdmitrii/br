<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20200408170500 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'postgresql', 'Migration can only be executed safely on \'postgresql\'.');

        $this->addSql('ALTER TABLE instashop ADD visible BOOLEAN DEFAULT \'true\' NOT NULL');
        $this->addSql('ALTER TABLE instashop ALTER id SET DEFAULT nextval(\'public.instashop_id_seq\'::regclass)');
        $this->addSql('ALTER TABLE instashop ALTER id DROP DEFAULT');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'postgresql', 'Migration can only be executed safely on \'postgresql\'.');

        $this->addSql('CREATE SCHEMA public');
        $this->addSql('ALTER TABLE Instashop DROP visible');
        $this->addSql('ALTER TABLE Instashop ALTER id DROP DEFAULT');
        $this->addSql('CREATE SEQUENCE Instashop_id_seq');
        $this->addSql('SELECT setval(\'Instashop_id_seq\', (SELECT MAX(id) FROM Instashop))');
        $this->addSql('ALTER TABLE Instashop ALTER id SET DEFAULT nextval(\'Instashop_id_seq\')');
    }
}
