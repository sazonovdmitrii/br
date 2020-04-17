<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20200417083744 extends AbstractMigration
{
    public function getDescription(): string
    {
        return 'Instashop Bundle';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'postgresql',
            'Migration can only be executed safely on \'postgresql\'.');
        $this->addSql('ALTER TABLE instashop ALTER id SET DEFAULT nextval(\'public.instashop_id_seq\'::regclass)');
        $this->addSql('ALTER TABLE instashop ALTER id DROP DEFAULT');
        $this->addSql('ALTER TABLE instashop_product ALTER instashop_id SET DEFAULT nextval(\'public.instashop_id_seq\'::regclass)');
        $this->addSql('ALTER TABLE instashop_product ALTER instashop_id DROP DEFAULT');
        $this->addSql('ALTER TABLE instashoptranslations ALTER translatable_id SET DEFAULT nextval(\'public.instashop_id_seq\'::regclass)');
        $this->addSql('ALTER TABLE instashoptranslations ALTER translatable_id DROP DEFAULT');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'postgresql',
            'Migration can only be executed safely on \'postgresql\'.');
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('ALTER TABLE instashop_product ALTER instashop_id DROP DEFAULT');
        $this->addSql('CREATE SEQUENCE instashop_product_instashop_id_seq');
        $this->addSql('SELECT setval(\'instashop_product_instashop_id_seq\', (SELECT MAX(instashop_id) FROM instashop_product))');
        $this->addSql('ALTER TABLE instashop_product ALTER instashop_id SET DEFAULT nextval(\'instashop_product_instashop_id_seq\')');
        $this->addSql('ALTER TABLE InstashopTranslations ALTER translatable_id DROP DEFAULT');
        $this->addSql('CREATE SEQUENCE InstashopTranslations_translatable_id_seq');
        $this->addSql('SELECT setval(\'InstashopTranslations_translatable_id_seq\', (SELECT MAX(translatable_id) FROM InstashopTranslations))');
        $this->addSql('ALTER TABLE InstashopTranslations ALTER translatable_id SET DEFAULT nextval(\'InstashopTranslations_translatable_id_seq\')');
        $this->addSql('ALTER TABLE Instashop ALTER id DROP DEFAULT');
        $this->addSql('CREATE SEQUENCE Instashop_id_seq');
        $this->addSql('SELECT setval(\'Instashop_id_seq\', (SELECT MAX(id) FROM Instashop))');
        $this->addSql('ALTER TABLE Instashop ALTER id SET DEFAULT nextval(\'Instashop_id_seq\')');
    }
}
