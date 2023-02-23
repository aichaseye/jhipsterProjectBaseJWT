package mfpai.gouv.sn.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A NomCFP.
 */
@Entity
@Table(name = "nom_cfp")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class NomCFP implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "nom_cfp")
    private String nomCFP;

    @OneToMany(mappedBy = "nomCFP")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "chefEtablissement", "etablissement", "nomLycetech", "nomCFP" }, allowSetters = true)
    private Set<Apprenant> apprenants = new HashSet<>();

    @OneToMany(mappedBy = "nomCFP")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "bFPA", "etablissement", "nomLycetech", "nomCFP" }, allowSetters = true)
    private Set<Enseignant> enseignants = new HashSet<>();

    @OneToMany(mappedBy = "nomCFP")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "comptableMatiere", "etablissement", "nomLycetech", "nomCFP" }, allowSetters = true)
    private Set<Matiere> matieres = new HashSet<>();

    @OneToMany(mappedBy = "nomCFP")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(
        value = { "apprenants", "enseignants", "matieres", "demandes", "bFPA", "nomCFP", "nomLycetech" },
        allowSetters = true
    )
    private Set<Etablissement> etablissements = new HashSet<>();

    @OneToMany(mappedBy = "nomCFP")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "etablissement", "nomLycetech", "nomCFP" }, allowSetters = true)
    private Set<Demande> demandes = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public NomCFP id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNomCFP() {
        return this.nomCFP;
    }

    public NomCFP nomCFP(String nomCFP) {
        this.setNomCFP(nomCFP);
        return this;
    }

    public void setNomCFP(String nomCFP) {
        this.nomCFP = nomCFP;
    }

    public Set<Apprenant> getApprenants() {
        return this.apprenants;
    }

    public void setApprenants(Set<Apprenant> apprenants) {
        if (this.apprenants != null) {
            this.apprenants.forEach(i -> i.setNomCFP(null));
        }
        if (apprenants != null) {
            apprenants.forEach(i -> i.setNomCFP(this));
        }
        this.apprenants = apprenants;
    }

    public NomCFP apprenants(Set<Apprenant> apprenants) {
        this.setApprenants(apprenants);
        return this;
    }

    public NomCFP addApprenant(Apprenant apprenant) {
        this.apprenants.add(apprenant);
        apprenant.setNomCFP(this);
        return this;
    }

    public NomCFP removeApprenant(Apprenant apprenant) {
        this.apprenants.remove(apprenant);
        apprenant.setNomCFP(null);
        return this;
    }

    public Set<Enseignant> getEnseignants() {
        return this.enseignants;
    }

    public void setEnseignants(Set<Enseignant> enseignants) {
        if (this.enseignants != null) {
            this.enseignants.forEach(i -> i.setNomCFP(null));
        }
        if (enseignants != null) {
            enseignants.forEach(i -> i.setNomCFP(this));
        }
        this.enseignants = enseignants;
    }

    public NomCFP enseignants(Set<Enseignant> enseignants) {
        this.setEnseignants(enseignants);
        return this;
    }

    public NomCFP addEnseignant(Enseignant enseignant) {
        this.enseignants.add(enseignant);
        enseignant.setNomCFP(this);
        return this;
    }

    public NomCFP removeEnseignant(Enseignant enseignant) {
        this.enseignants.remove(enseignant);
        enseignant.setNomCFP(null);
        return this;
    }

    public Set<Matiere> getMatieres() {
        return this.matieres;
    }

    public void setMatieres(Set<Matiere> matieres) {
        if (this.matieres != null) {
            this.matieres.forEach(i -> i.setNomCFP(null));
        }
        if (matieres != null) {
            matieres.forEach(i -> i.setNomCFP(this));
        }
        this.matieres = matieres;
    }

    public NomCFP matieres(Set<Matiere> matieres) {
        this.setMatieres(matieres);
        return this;
    }

    public NomCFP addMatiere(Matiere matiere) {
        this.matieres.add(matiere);
        matiere.setNomCFP(this);
        return this;
    }

    public NomCFP removeMatiere(Matiere matiere) {
        this.matieres.remove(matiere);
        matiere.setNomCFP(null);
        return this;
    }

    public Set<Etablissement> getEtablissements() {
        return this.etablissements;
    }

    public void setEtablissements(Set<Etablissement> etablissements) {
        if (this.etablissements != null) {
            this.etablissements.forEach(i -> i.setNomCFP(null));
        }
        if (etablissements != null) {
            etablissements.forEach(i -> i.setNomCFP(this));
        }
        this.etablissements = etablissements;
    }

    public NomCFP etablissements(Set<Etablissement> etablissements) {
        this.setEtablissements(etablissements);
        return this;
    }

    public NomCFP addEtablissement(Etablissement etablissement) {
        this.etablissements.add(etablissement);
        etablissement.setNomCFP(this);
        return this;
    }

    public NomCFP removeEtablissement(Etablissement etablissement) {
        this.etablissements.remove(etablissement);
        etablissement.setNomCFP(null);
        return this;
    }

    public Set<Demande> getDemandes() {
        return this.demandes;
    }

    public void setDemandes(Set<Demande> demandes) {
        if (this.demandes != null) {
            this.demandes.forEach(i -> i.setNomCFP(null));
        }
        if (demandes != null) {
            demandes.forEach(i -> i.setNomCFP(this));
        }
        this.demandes = demandes;
    }

    public NomCFP demandes(Set<Demande> demandes) {
        this.setDemandes(demandes);
        return this;
    }

    public NomCFP addDemande(Demande demande) {
        this.demandes.add(demande);
        demande.setNomCFP(this);
        return this;
    }

    public NomCFP removeDemande(Demande demande) {
        this.demandes.remove(demande);
        demande.setNomCFP(null);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof NomCFP)) {
            return false;
        }
        return id != null && id.equals(((NomCFP) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "NomCFP{" +
            "id=" + getId() +
            ", nomCFP='" + getNomCFP() + "'" +
            "}";
    }
}
