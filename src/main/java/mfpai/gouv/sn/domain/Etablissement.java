package mfpai.gouv.sn.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;
import javax.validation.constraints.*;
import mfpai.gouv.sn.domain.enumeration.CodeRegion;
import mfpai.gouv.sn.domain.enumeration.NomDep;
import mfpai.gouv.sn.domain.enumeration.NomReg;
import mfpai.gouv.sn.domain.enumeration.StatutEtab;
import mfpai.gouv.sn.domain.enumeration.TypeEtab;
import mfpai.gouv.sn.domain.enumeration.TypeInspection;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Etablissement.
 */
@Entity
@Table(name = "etablissement")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Etablissement implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "matricule_etab", unique = true)
    private String matriculeEtab;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "type_etab", nullable = false)
    private TypeEtab typeEtab;

    @Column(name = "autrenom_etab")
    private String autrenomEtab;

    @Column(name = "annee_cre")
    private Integer anneeCre;

    @Enumerated(EnumType.STRING)
    @Column(name = "statut")
    private StatutEtab statut;

    @Enumerated(EnumType.STRING)
    @Column(name = "region")
    private NomReg region;

    @Column(name = "autre_region")
    private String autreRegion;

    @Enumerated(EnumType.STRING)
    @Column(name = "departement")
    private NomDep departement;

    @Column(name = "autre_dep")
    private String autreDep;

    @Column(name = "commune")
    private String commune;

    @Enumerated(EnumType.STRING)
    @Column(name = "code_region")
    private CodeRegion codeRegion;

    @Column(name = "autrecode_region")
    private String autrecodeRegion;

    @Column(name = "email_etab")
    private String emailEtab;

    @Enumerated(EnumType.STRING)
    @Column(name = "type_insp")
    private TypeInspection typeInsp;

    @OneToMany(mappedBy = "etablissement")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "chefEtablissement", "etablissement", "nomLycetech", "nomCFP" }, allowSetters = true)
    private Set<Apprenant> apprenants = new HashSet<>();

    @OneToMany(mappedBy = "etablissement")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "bFPA", "etablissement", "nomLycetech", "nomCFP" }, allowSetters = true)
    private Set<Enseignant> enseignants = new HashSet<>();

    @OneToMany(mappedBy = "etablissement")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "comptableMatiere", "etablissement", "nomLycetech", "nomCFP" }, allowSetters = true)
    private Set<Matiere> matieres = new HashSet<>();

    @OneToMany(mappedBy = "etablissement")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "etablissement", "nomLycetech", "nomCFP" }, allowSetters = true)
    private Set<Demande> demandes = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties(value = { "user", "etablissements", "enseignants" }, allowSetters = true)
    private BFPA bFPA;

    @ManyToOne
    @JsonIgnoreProperties(value = { "apprenants", "enseignants", "matieres", "etablissements", "demandes" }, allowSetters = true)
    private NomCFP nomCFP;

    @ManyToOne
    @JsonIgnoreProperties(value = { "apprenants", "enseignants", "matieres", "etablissements", "demandes" }, allowSetters = true)
    private NomLycetech nomLycetech;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Etablissement id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getMatriculeEtab() {
        return this.matriculeEtab;
    }

    public Etablissement matriculeEtab(String matriculeEtab) {
        this.setMatriculeEtab(matriculeEtab);
        return this;
    }

    public void setMatriculeEtab(String matriculeEtab) {
        this.matriculeEtab = matriculeEtab;
    }

    public TypeEtab getTypeEtab() {
        return this.typeEtab;
    }

    public Etablissement typeEtab(TypeEtab typeEtab) {
        this.setTypeEtab(typeEtab);
        return this;
    }

    public void setTypeEtab(TypeEtab typeEtab) {
        this.typeEtab = typeEtab;
    }

    public String getAutrenomEtab() {
        return this.autrenomEtab;
    }

    public Etablissement autrenomEtab(String autrenomEtab) {
        this.setAutrenomEtab(autrenomEtab);
        return this;
    }

    public void setAutrenomEtab(String autrenomEtab) {
        this.autrenomEtab = autrenomEtab;
    }

    public Integer getAnneeCre() {
        return this.anneeCre;
    }

    public Etablissement anneeCre(Integer anneeCre) {
        this.setAnneeCre(anneeCre);
        return this;
    }

    public void setAnneeCre(Integer anneeCre) {
        this.anneeCre = anneeCre;
    }

    public StatutEtab getStatut() {
        return this.statut;
    }

    public Etablissement statut(StatutEtab statut) {
        this.setStatut(statut);
        return this;
    }

    public void setStatut(StatutEtab statut) {
        this.statut = statut;
    }

    public NomReg getRegion() {
        return this.region;
    }

    public Etablissement region(NomReg region) {
        this.setRegion(region);
        return this;
    }

    public void setRegion(NomReg region) {
        this.region = region;
    }

    public String getAutreRegion() {
        return this.autreRegion;
    }

    public Etablissement autreRegion(String autreRegion) {
        this.setAutreRegion(autreRegion);
        return this;
    }

    public void setAutreRegion(String autreRegion) {
        this.autreRegion = autreRegion;
    }

    public NomDep getDepartement() {
        return this.departement;
    }

    public Etablissement departement(NomDep departement) {
        this.setDepartement(departement);
        return this;
    }

    public void setDepartement(NomDep departement) {
        this.departement = departement;
    }

    public String getAutreDep() {
        return this.autreDep;
    }

    public Etablissement autreDep(String autreDep) {
        this.setAutreDep(autreDep);
        return this;
    }

    public void setAutreDep(String autreDep) {
        this.autreDep = autreDep;
    }

    public String getCommune() {
        return this.commune;
    }

    public Etablissement commune(String commune) {
        this.setCommune(commune);
        return this;
    }

    public void setCommune(String commune) {
        this.commune = commune;
    }

    public CodeRegion getCodeRegion() {
        return this.codeRegion;
    }

    public Etablissement codeRegion(CodeRegion codeRegion) {
        this.setCodeRegion(codeRegion);
        return this;
    }

    public void setCodeRegion(CodeRegion codeRegion) {
        this.codeRegion = codeRegion;
    }

    public String getAutrecodeRegion() {
        return this.autrecodeRegion;
    }

    public Etablissement autrecodeRegion(String autrecodeRegion) {
        this.setAutrecodeRegion(autrecodeRegion);
        return this;
    }

    public void setAutrecodeRegion(String autrecodeRegion) {
        this.autrecodeRegion = autrecodeRegion;
    }

    public String getEmailEtab() {
        return this.emailEtab;
    }

    public Etablissement emailEtab(String emailEtab) {
        this.setEmailEtab(emailEtab);
        return this;
    }

    public void setEmailEtab(String emailEtab) {
        this.emailEtab = emailEtab;
    }

    public TypeInspection getTypeInsp() {
        return this.typeInsp;
    }

    public Etablissement typeInsp(TypeInspection typeInsp) {
        this.setTypeInsp(typeInsp);
        return this;
    }

    public void setTypeInsp(TypeInspection typeInsp) {
        this.typeInsp = typeInsp;
    }

    public Set<Apprenant> getApprenants() {
        return this.apprenants;
    }

    public void setApprenants(Set<Apprenant> apprenants) {
        if (this.apprenants != null) {
            this.apprenants.forEach(i -> i.setEtablissement(null));
        }
        if (apprenants != null) {
            apprenants.forEach(i -> i.setEtablissement(this));
        }
        this.apprenants = apprenants;
    }

    public Etablissement apprenants(Set<Apprenant> apprenants) {
        this.setApprenants(apprenants);
        return this;
    }

    public Etablissement addApprenant(Apprenant apprenant) {
        this.apprenants.add(apprenant);
        apprenant.setEtablissement(this);
        return this;
    }

    public Etablissement removeApprenant(Apprenant apprenant) {
        this.apprenants.remove(apprenant);
        apprenant.setEtablissement(null);
        return this;
    }

    public Set<Enseignant> getEnseignants() {
        return this.enseignants;
    }

    public void setEnseignants(Set<Enseignant> enseignants) {
        if (this.enseignants != null) {
            this.enseignants.forEach(i -> i.setEtablissement(null));
        }
        if (enseignants != null) {
            enseignants.forEach(i -> i.setEtablissement(this));
        }
        this.enseignants = enseignants;
    }

    public Etablissement enseignants(Set<Enseignant> enseignants) {
        this.setEnseignants(enseignants);
        return this;
    }

    public Etablissement addEnseignant(Enseignant enseignant) {
        this.enseignants.add(enseignant);
        enseignant.setEtablissement(this);
        return this;
    }

    public Etablissement removeEnseignant(Enseignant enseignant) {
        this.enseignants.remove(enseignant);
        enseignant.setEtablissement(null);
        return this;
    }

    public Set<Matiere> getMatieres() {
        return this.matieres;
    }

    public void setMatieres(Set<Matiere> matieres) {
        if (this.matieres != null) {
            this.matieres.forEach(i -> i.setEtablissement(null));
        }
        if (matieres != null) {
            matieres.forEach(i -> i.setEtablissement(this));
        }
        this.matieres = matieres;
    }

    public Etablissement matieres(Set<Matiere> matieres) {
        this.setMatieres(matieres);
        return this;
    }

    public Etablissement addMatiere(Matiere matiere) {
        this.matieres.add(matiere);
        matiere.setEtablissement(this);
        return this;
    }

    public Etablissement removeMatiere(Matiere matiere) {
        this.matieres.remove(matiere);
        matiere.setEtablissement(null);
        return this;
    }

    public Set<Demande> getDemandes() {
        return this.demandes;
    }

    public void setDemandes(Set<Demande> demandes) {
        if (this.demandes != null) {
            this.demandes.forEach(i -> i.setEtablissement(null));
        }
        if (demandes != null) {
            demandes.forEach(i -> i.setEtablissement(this));
        }
        this.demandes = demandes;
    }

    public Etablissement demandes(Set<Demande> demandes) {
        this.setDemandes(demandes);
        return this;
    }

    public Etablissement addDemande(Demande demande) {
        this.demandes.add(demande);
        demande.setEtablissement(this);
        return this;
    }

    public Etablissement removeDemande(Demande demande) {
        this.demandes.remove(demande);
        demande.setEtablissement(null);
        return this;
    }

    public BFPA getBFPA() {
        return this.bFPA;
    }

    public void setBFPA(BFPA bFPA) {
        this.bFPA = bFPA;
    }

    public Etablissement bFPA(BFPA bFPA) {
        this.setBFPA(bFPA);
        return this;
    }

    public NomCFP getNomCFP() {
        return this.nomCFP;
    }

    public void setNomCFP(NomCFP nomCFP) {
        this.nomCFP = nomCFP;
    }

    public Etablissement nomCFP(NomCFP nomCFP) {
        this.setNomCFP(nomCFP);
        return this;
    }

    public NomLycetech getNomLycetech() {
        return this.nomLycetech;
    }

    public void setNomLycetech(NomLycetech nomLycetech) {
        this.nomLycetech = nomLycetech;
    }

    public Etablissement nomLycetech(NomLycetech nomLycetech) {
        this.setNomLycetech(nomLycetech);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Etablissement)) {
            return false;
        }
        return id != null && id.equals(((Etablissement) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Etablissement{" +
            "id=" + getId() +
            ", matriculeEtab='" + getMatriculeEtab() + "'" +
            ", typeEtab='" + getTypeEtab() + "'" +
            ", autrenomEtab='" + getAutrenomEtab() + "'" +
            ", anneeCre=" + getAnneeCre() +
            ", statut='" + getStatut() + "'" +
            ", region='" + getRegion() + "'" +
            ", autreRegion='" + getAutreRegion() + "'" +
            ", departement='" + getDepartement() + "'" +
            ", autreDep='" + getAutreDep() + "'" +
            ", commune='" + getCommune() + "'" +
            ", codeRegion='" + getCodeRegion() + "'" +
            ", autrecodeRegion='" + getAutrecodeRegion() + "'" +
            ", emailEtab='" + getEmailEtab() + "'" +
            ", typeInsp='" + getTypeInsp() + "'" +
            "}";
    }
}
