package mfpai.gouv.sn.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A NomLycetech.
 */
@Entity
@Table(name = "nom_lycetech")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class NomLycetech implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "nom_lycee")
    private String nomLycee;

    @OneToMany(mappedBy = "nomLycetech")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "chefEtablissement", "etablissement", "nomLycetech", "nomCFP" }, allowSetters = true)
    private Set<Apprenant> apprenants = new HashSet<>();

    @OneToMany(mappedBy = "nomLycetech")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "bFPA", "etablissement", "nomLycetech", "nomCFP" }, allowSetters = true)
    private Set<Enseignant> enseignants = new HashSet<>();

    @OneToMany(mappedBy = "nomLycetech")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "comptableMatiere", "etablissement", "nomLycetech", "nomCFP" }, allowSetters = true)
    private Set<Matiere> matieres = new HashSet<>();

    @OneToMany(mappedBy = "nomLycetech")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(
        value = { "apprenants", "enseignants", "matieres", "demandes", "bFPA", "nomCFP", "nomLycetech" },
        allowSetters = true
    )
    private Set<Etablissement> etablissements = new HashSet<>();

    @OneToMany(mappedBy = "nomLycetech")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "etablissement", "nomLycetech", "nomCFP" }, allowSetters = true)
    private Set<Demande> demandes = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public NomLycetech id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNomLycee() {
        return this.nomLycee;
    }

    public NomLycetech nomLycee(String nomLycee) {
        this.setNomLycee(nomLycee);
        return this;
    }

    public void setNomLycee(String nomLycee) {
        this.nomLycee = nomLycee;
    }

    public Set<Apprenant> getApprenants() {
        return this.apprenants;
    }

    public void setApprenants(Set<Apprenant> apprenants) {
        if (this.apprenants != null) {
            this.apprenants.forEach(i -> i.setNomLycetech(null));
        }
        if (apprenants != null) {
            apprenants.forEach(i -> i.setNomLycetech(this));
        }
        this.apprenants = apprenants;
    }

    public NomLycetech apprenants(Set<Apprenant> apprenants) {
        this.setApprenants(apprenants);
        return this;
    }

    public NomLycetech addApprenant(Apprenant apprenant) {
        this.apprenants.add(apprenant);
        apprenant.setNomLycetech(this);
        return this;
    }

    public NomLycetech removeApprenant(Apprenant apprenant) {
        this.apprenants.remove(apprenant);
        apprenant.setNomLycetech(null);
        return this;
    }

    public Set<Enseignant> getEnseignants() {
        return this.enseignants;
    }

    public void setEnseignants(Set<Enseignant> enseignants) {
        if (this.enseignants != null) {
            this.enseignants.forEach(i -> i.setNomLycetech(null));
        }
        if (enseignants != null) {
            enseignants.forEach(i -> i.setNomLycetech(this));
        }
        this.enseignants = enseignants;
    }

    public NomLycetech enseignants(Set<Enseignant> enseignants) {
        this.setEnseignants(enseignants);
        return this;
    }

    public NomLycetech addEnseignant(Enseignant enseignant) {
        this.enseignants.add(enseignant);
        enseignant.setNomLycetech(this);
        return this;
    }

    public NomLycetech removeEnseignant(Enseignant enseignant) {
        this.enseignants.remove(enseignant);
        enseignant.setNomLycetech(null);
        return this;
    }

    public Set<Matiere> getMatieres() {
        return this.matieres;
    }

    public void setMatieres(Set<Matiere> matieres) {
        if (this.matieres != null) {
            this.matieres.forEach(i -> i.setNomLycetech(null));
        }
        if (matieres != null) {
            matieres.forEach(i -> i.setNomLycetech(this));
        }
        this.matieres = matieres;
    }

    public NomLycetech matieres(Set<Matiere> matieres) {
        this.setMatieres(matieres);
        return this;
    }

    public NomLycetech addMatiere(Matiere matiere) {
        this.matieres.add(matiere);
        matiere.setNomLycetech(this);
        return this;
    }

    public NomLycetech removeMatiere(Matiere matiere) {
        this.matieres.remove(matiere);
        matiere.setNomLycetech(null);
        return this;
    }

    public Set<Etablissement> getEtablissements() {
        return this.etablissements;
    }

    public void setEtablissements(Set<Etablissement> etablissements) {
        if (this.etablissements != null) {
            this.etablissements.forEach(i -> i.setNomLycetech(null));
        }
        if (etablissements != null) {
            etablissements.forEach(i -> i.setNomLycetech(this));
        }
        this.etablissements = etablissements;
    }

    public NomLycetech etablissements(Set<Etablissement> etablissements) {
        this.setEtablissements(etablissements);
        return this;
    }

    public NomLycetech addEtablissement(Etablissement etablissement) {
        this.etablissements.add(etablissement);
        etablissement.setNomLycetech(this);
        return this;
    }

    public NomLycetech removeEtablissement(Etablissement etablissement) {
        this.etablissements.remove(etablissement);
        etablissement.setNomLycetech(null);
        return this;
    }

    public Set<Demande> getDemandes() {
        return this.demandes;
    }

    public void setDemandes(Set<Demande> demandes) {
        if (this.demandes != null) {
            this.demandes.forEach(i -> i.setNomLycetech(null));
        }
        if (demandes != null) {
            demandes.forEach(i -> i.setNomLycetech(this));
        }
        this.demandes = demandes;
    }

    public NomLycetech demandes(Set<Demande> demandes) {
        this.setDemandes(demandes);
        return this;
    }

    public NomLycetech addDemande(Demande demande) {
        this.demandes.add(demande);
        demande.setNomLycetech(this);
        return this;
    }

    public NomLycetech removeDemande(Demande demande) {
        this.demandes.remove(demande);
        demande.setNomLycetech(null);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof NomLycetech)) {
            return false;
        }
        return id != null && id.equals(((NomLycetech) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "NomLycetech{" +
            "id=" + getId() +
            ", nomLycee='" + getNomLycee() + "'" +
            "}";
    }
}
