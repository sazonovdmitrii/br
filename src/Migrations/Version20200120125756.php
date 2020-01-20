<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20200120125756 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'postgresql', 'Migration can only be executed safely on \'postgresql\'.');

        $this->addSql('CREATE TABLE productcollection_productcollectionurl (productcollection_id INT NOT NULL, productcollectionurl_id INT NOT NULL, PRIMARY KEY(productcollection_id, productcollectionurl_id))');
        $this->addSql('CREATE INDEX IDX_8EE5C3D986B6163F ON productcollection_productcollectionurl (productcollection_id)');
        $this->addSql('CREATE INDEX IDX_8EE5C3D935F6C59 ON productcollection_productcollectionurl (productcollectionurl_id)');
        $this->addSql('ALTER TABLE productcollection_productcollectionurl ADD CONSTRAINT FK_8EE5C3D986B6163F FOREIGN KEY (productcollection_id) REFERENCES ProductCollection (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE productcollection_productcollectionurl ADD CONSTRAINT FK_8EE5C3D935F6C59 FOREIGN KEY (productcollectionurl_id) REFERENCES ProductCollectionUrl (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'postgresql', 'Migration can only be executed safely on \'postgresql\'.');

        $this->addSql('CREATE SCHEMA public');
        $this->addSql('DROP TABLE productcollection_productcollectionurl');
    }
}
