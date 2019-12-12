<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20191211155616 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'postgresql', 'Migration can only be executed safely on \'postgresql\'.');

        $this->addSql('CREATE TABLE product_lense (product_id INT NOT NULL, lense_id INT NOT NULL, PRIMARY KEY(product_id, lense_id))');
        $this->addSql('CREATE INDEX IDX_4CC748F44584665A ON product_lense (product_id)');
        $this->addSql('CREATE INDEX IDX_4CC748F4229CE6F9 ON product_lense (lense_id)');
        $this->addSql('ALTER TABLE product_lense ADD CONSTRAINT FK_4CC748F44584665A FOREIGN KEY (product_id) REFERENCES Product (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE product_lense ADD CONSTRAINT FK_4CC748F4229CE6F9 FOREIGN KEY (lense_id) REFERENCES Lense (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'postgresql', 'Migration can only be executed safely on \'postgresql\'.');

        $this->addSql('CREATE SCHEMA public');
        $this->addSql('DROP TABLE product_lense');
    }
}
