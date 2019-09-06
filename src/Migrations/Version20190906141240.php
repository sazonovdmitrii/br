<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20190906141240 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'postgresql', 'Migration can only be executed safely on \'postgresql\'.');

        $this->addSql('CREATE TABLE productitemtagitem_productitem (productitemtagitem_id INT NOT NULL, productitem_id INT NOT NULL, PRIMARY KEY(productitemtagitem_id, productitem_id))');
        $this->addSql('CREATE INDEX IDX_B0AE8DE936E617C0 ON productitemtagitem_productitem (productitemtagitem_id)');
        $this->addSql('CREATE INDEX IDX_B0AE8DE98920F479 ON productitemtagitem_productitem (productitem_id)');
        $this->addSql('ALTER TABLE productitemtagitem_productitem ADD CONSTRAINT FK_B0AE8DE936E617C0 FOREIGN KEY (productitemtagitem_id) REFERENCES ProductItemTagItem (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE productitemtagitem_productitem ADD CONSTRAINT FK_B0AE8DE98920F479 FOREIGN KEY (productitem_id) REFERENCES ProductItem (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE productitemtagitem ADD entity_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE productitemtagitem ADD name VARCHAR(255) DEFAULT NULL');
        $this->addSql('ALTER TABLE productitemtagitem ADD created TIMESTAMP(0) WITHOUT TIME ZONE DEFAULT NULL');
        $this->addSql('ALTER TABLE productitemtagitem ADD CONSTRAINT FK_681D3ABC81257D5D FOREIGN KEY (entity_id) REFERENCES ProductItemTag (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('CREATE INDEX IDX_681D3ABC81257D5D ON productitemtagitem (entity_id)');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'postgresql', 'Migration can only be executed safely on \'postgresql\'.');

        $this->addSql('CREATE SCHEMA public');
        $this->addSql('DROP TABLE productitemtagitem_productitem');
        $this->addSql('ALTER TABLE ProductItemTagItem DROP CONSTRAINT FK_681D3ABC81257D5D');
        $this->addSql('DROP INDEX IDX_681D3ABC81257D5D');
        $this->addSql('ALTER TABLE ProductItemTagItem DROP entity_id');
        $this->addSql('ALTER TABLE ProductItemTagItem DROP name');
        $this->addSql('ALTER TABLE ProductItemTagItem DROP created');
    }
}
