<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20200417160121 extends AbstractMigration
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
        $this->addSql('CREATE TABLE Instashop (id INT DEFAULT nextval(\'public.instashop_id_seq\'::regclass) NOT NULL, instagram_id INT NOT NULL, hash_tag VARCHAR(100) DEFAULT NULL, path VARCHAR(255) NOT NULL, coordinates TEXT DEFAULT NULL, status VARCHAR(25) DEFAULT NULL, visible BOOLEAN DEFAULT \'true\' NOT NULL, clicks INT DEFAULT 0 NOT NULL, purchases INT DEFAULT 0 NOT NULL, created TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE UNIQUE INDEX instagram_id_idx ON Instashop (instagram_id)');
        $this->addSql('CREATE TABLE instashop_product (instashop_id INT DEFAULT nextval(\'public.instashop_id_seq\'::regclass) NOT NULL, product_id INT NOT NULL, PRIMARY KEY(instashop_id, product_id))');
        $this->addSql('CREATE INDEX IDX_5E5454FAB0863A0C ON instashop_product (instashop_id)');
        $this->addSql('CREATE INDEX IDX_5E5454FA4584665A ON instashop_product (product_id)');
        $this->addSql('CREATE TABLE InstashopTranslations (id INT NOT NULL, translatable_id INT DEFAULT nextval(\'public.instashop_id_seq\'::regclass), title VARCHAR(255) DEFAULT NULL, description TEXT DEFAULT NULL, locale VARCHAR(255) NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_6ADD4FB02C2AC5D3 ON InstashopTranslations (translatable_id)');
        $this->addSql('CREATE UNIQUE INDEX InstashopTranslations_unique_translation ON InstashopTranslations (translatable_id, locale)');
        $this->addSql('ALTER TABLE instashop_product ADD CONSTRAINT FK_5E5454FAB0863A0C FOREIGN KEY (instashop_id) REFERENCES Instashop (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE instashop_product ADD CONSTRAINT FK_5E5454FA4584665A FOREIGN KEY (product_id) REFERENCES Product (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE InstashopTranslations ADD CONSTRAINT FK_6ADD4FB02C2AC5D3 FOREIGN KEY (translatable_id) REFERENCES Instashop (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'postgresql',
            'Migration can only be executed safely on \'postgresql\'.');
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('ALTER TABLE instashop_product DROP CONSTRAINT FK_5E5454FAB0863A0C');
        $this->addSql('ALTER TABLE InstashopTranslations DROP CONSTRAINT FK_6ADD4FB02C2AC5D3');
        $this->addSql('DROP TABLE Instashop');
        $this->addSql('DROP TABLE instashop_product');
        $this->addSql('DROP TABLE InstashopTranslations');
    }
}
