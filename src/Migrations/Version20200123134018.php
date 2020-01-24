<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20200123134018 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'postgresql', 'Migration can only be executed safely on \'postgresql\'.');

        $this->addSql('CREATE SEQUENCE BannerItem_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE TABLE BannerItem (id INT NOT NULL, banner_id INT DEFAULT NULL, path VARCHAR(255) DEFAULT NULL, link VARCHAR(255) DEFAULT NULL, active BOOLEAN DEFAULT NULL, description TEXT DEFAULT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_6973D747684EC833 ON BannerItem (banner_id)');
        $this->addSql('ALTER TABLE BannerItem ADD CONSTRAINT FK_6973D747684EC833 FOREIGN KEY (banner_id) REFERENCES Banner (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE banner DROP path');
        $this->addSql('ALTER TABLE banner DROP link');
        $this->addSql('ALTER TABLE banner DROP active');
        $this->addSql('ALTER TABLE banner DROP description');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'postgresql', 'Migration can only be executed safely on \'postgresql\'.');

        $this->addSql('CREATE SCHEMA public');
        $this->addSql('DROP SEQUENCE BannerItem_id_seq CASCADE');
        $this->addSql('DROP TABLE BannerItem');
        $this->addSql('ALTER TABLE Banner ADD path VARCHAR(255) DEFAULT NULL');
        $this->addSql('ALTER TABLE Banner ADD link VARCHAR(255) DEFAULT NULL');
        $this->addSql('ALTER TABLE Banner ADD active BOOLEAN DEFAULT NULL');
        $this->addSql('ALTER TABLE Banner ADD description TEXT DEFAULT NULL');
    }
}
