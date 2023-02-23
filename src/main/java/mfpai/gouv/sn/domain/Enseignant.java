package mfpai.gouv.sn.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import javax.persistence.*;
import javax.validation.constraints.*;
import mfpai.gouv.sn.domain.enumeration.CodeRegion;
import mfpai.gouv.sn.domain.enumeration.NomReg;
import mfpai.gouv.sn.domain.enumeration.Sexe;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Enseignant.
 */
@Entity
@Table(name = "enseignant")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Enseignant implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "matricule_ens", unique = true)
    private String matriculeEns;

    @NotNull
    @Column(name = "nom", nullable = false)
    private String nom;

    @NotNull
    @Column(name = "prenom", nullable = false)
    private String prenom;

    @NotNull
    @Column(name = "num_ci", nullable = false)
    private String numCI;

    @NotNull
    @Column(name = "annee_dentree", nullable = false)
    private String anneeDentree;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "region", nullable = false)
    private NomReg region;

    @Column(name = "autre_region")
    private String autreRegion;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "code_region", nullable = false)
    private CodeRegion codeRegion;

    @Column(name = "autrecode_region")
    private String autrecodeRegion;

    @Enumerated(EnumType.STRING)
    @Column(name = "sexe")
    private Sexe sexe;

    @NotNull
    @Column(name = "email", nullable = false, unique = true)
    private String email;

    @ManyToOne
    @JsonIgnoreProperties(value = { "user", "etablissements", "enseignants" }, allowSetters = true)
    private BFPA bFPA;

    @ManyToOne
    @JsonIgnoreProperties(
        value = { "apprenants", "enseignants", "matieres", "demandes", "bFPA", "nomCFP", "nomLycetech" },
        allowSetters = true
    )
    private Etablissement etablissement;

    @ManyToOne
    @JsonIgnoreProperties(value = { "apprenants", "enseignants", "matieres", "etablissements", "demandes" }, allowSetters = true)
    private NomLycetech nomLycetech;

    @ManyToOne
    @JsonIgnoreProperties(value = { "apprenants", "enseignants", "matieres", "etablissements", "demandes" }, allowSetters = true)
    private NomCFP nomCFP;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Enseignant id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getMatriculeEns() {
        return this.matriculeEns;
    }

    public Enseignant matriculeEns(String matriculeEns) {
        this.setMatriculeEns(matriculeEns);
        return this;
    }

    public void setMatriculeEns(String matriculeEns) {
        this.matriculeEns = matriculeEns;
    }

    public String getNom() {
        return this.nom;
    }

    public Enseignant nom(String nom) {
        this.setNom(nom);
        return this;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getPrenom() {
        return this.prenom;
    }

    public Enseignant prenom(String prenom) {
        this.setPrenom(prenom);
        return this;
    }

    public void setPrenom(String prenom) {
        this.prenom = prenom;
    }

    public String getNumCI() {
        return this.numCI;
    }

    public Enseignant numCI(String numCI) {
        this.setNumCI(numCI);
        return this;
    }

    public void setNumCI(String numCI) {
        this.numCI = numCI;
    }

    public String getAnneeDentree() {
        return this.anneeDentree;
    }

    public Enseignant anneeDentree(String anneeDentree) {
        this.setAnneeDentree(anneeDentree);
        return this;
    }

    public void setAnneeDentree(String anneeDentree) {
        this.anneeDentree = anneeDentree;
    }

    public NomReg getRegion() {
        return this.region;
    }

    public Enseignant region(NomReg region) {
        this.setRegion(region);
        return this;
    }

    public void setRegion(NomReg region) {
        this.region = region;
    }

    public String getAutreRegion() {
        return this.autreRegion;
    }

    public Enseignant autreRegion(String autreRegion) {
        this.setAutreRegion(autreRegion);
        return this;
    }

    public void setAutreRegion(String autreRegion) {
        this.autreRegion = autreRegion;
    }

    public CodeRegion getCodeRegion() {
        return this.codeRegion;
    }

    public Enseignant codeRegion(CodeRegion codeRegion) {
        this.setCodeRegion(codeRegion);
        return this;
    }

    public void setCodeRegion(CodeRegion codeRegion) {
        this.codeRegion = codeRegion;
    }

    public String getAutrecodeRegion() {
        return this.autrecodeRegion;
    }

    public Enseignant autrecodeRegion(String autrecodeRegion) {
        this.setAutrecodeRegion(autrecodeRegion);
        return this;
    }

    public void setAutrecodeRegion(String autrecodeRegion) {
        this.autrecodeRegion = autrecodeRegion;
    }

    public Sexe getSexe() {
        return this.sexe;
    }

    public Enseignant sexe(Sexe sexe) {
        this.setSexe(sexe);
        return this;
    }

    public void setSexe(Sexe sexe) {
        this.sexe = sexe;
    }

    public String getEmail() {
        return this.email;
    }

    public Enseignant email(String email) {
        this.setEmail(email);
        return this;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public BFPA getBFPA() {
        return this.bFPA;
    }

    public void setBFPA(BFPA bFPA) {
        this.bFPA = bFPA;
    }

    public Enseignant bFPA(BFPA bFPA) {
        this.setBFPA(bFPA);
        return this;
    }

    public Etablissement getEtablissement() {
        return this.etablissement;
    }

    public void setEtablissement(Etablissement etablissement) {
        this.etablissement = etablissement;
    }

    public Enseignant etablissement(Etablissement etablissement) {
        this.setEtablissement(etablissement);
        return this;
    }

    public NomLycetech getNomLycetech() {
        return this.nomLycetech;
    }

    public void setNomLycetech(NomLycetech nomLycetech) {
        this.nomLycetech = nomLycetech;
    }

    public Enseignant nomLycetech(NomLycetech nomLycetech) {
        this.setNomLycetech(nomLycetech);
        return this;
    }

    public NomCFP getNomCFP() {
        return this.nomCFP;
    }

    public void setNomCFP(NomCFP nomCFP) {
        this.nomCFP = nomCFP;
    }

    public Enseignant nomCFP(NomCFP nomCFP) {
        this.setNomCFP(nomCFP);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Enseignant)) {
            return false;
        }
        return id != null && id.equals(((Enseignant) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Enseignant{" +
            "id=" + getId() +
            ", matriculeEns='" + getMatriculeEns() + "'" +
            ", nom='" + getNom() + "'" +
            ", prenom='" + getPrenom() + "'" +
            ", numCI='" + getNumCI() + "'" +
            ", anneeDentree='" + getAnneeDentree() + "'" +
            ", region='" + getRegion() + "'" +
            ", autreRegion='" + getAutreRegion() + "'" +
            ", codeRegion='" + getCodeRegion() + "'" +
            ", autrecodeRegion='" + getAutrecodeRegion() + "'" +
            ", sexe='" + getSexe() + "'" +
            ", email='" + getEmail() + "'" +
            "}";
    }
}
