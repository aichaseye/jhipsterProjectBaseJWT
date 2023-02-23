package mfpai.gouv.sn.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import javax.persistence.*;
import javax.validation.constraints.*;
import mfpai.gouv.sn.domain.enumeration.Sexe;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Apprenant.
 */
@Entity
@Table(name = "apprenant")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Apprenant implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "matricule_app", unique = true)
    private String matriculeApp;

    @NotNull
    @Column(name = "nom", nullable = false)
    private String nom;

    @NotNull
    @Column(name = "prenom", nullable = false)
    private String prenom;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "sexe", nullable = false)
    private Sexe sexe;

    @NotNull
    @Column(name = "telephone", nullable = false)
    private String telephone;

    @NotNull
    @Column(name = "email", nullable = false, unique = true)
    private String email;

    @ManyToOne
    @JsonIgnoreProperties(value = { "user", "apprenants" }, allowSetters = true)
    private ChefEtablissement chefEtablissement;

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

    public Apprenant id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getMatriculeApp() {
        return this.matriculeApp;
    }

    public Apprenant matriculeApp(String matriculeApp) {
        this.setMatriculeApp(matriculeApp);
        return this;
    }

    public void setMatriculeApp(String matriculeApp) {
        this.matriculeApp = matriculeApp;
    }

    public String getNom() {
        return this.nom;
    }

    public Apprenant nom(String nom) {
        this.setNom(nom);
        return this;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getPrenom() {
        return this.prenom;
    }

    public Apprenant prenom(String prenom) {
        this.setPrenom(prenom);
        return this;
    }

    public void setPrenom(String prenom) {
        this.prenom = prenom;
    }

    public Sexe getSexe() {
        return this.sexe;
    }

    public Apprenant sexe(Sexe sexe) {
        this.setSexe(sexe);
        return this;
    }

    public void setSexe(Sexe sexe) {
        this.sexe = sexe;
    }

    public String getTelephone() {
        return this.telephone;
    }

    public Apprenant telephone(String telephone) {
        this.setTelephone(telephone);
        return this;
    }

    public void setTelephone(String telephone) {
        this.telephone = telephone;
    }

    public String getEmail() {
        return this.email;
    }

    public Apprenant email(String email) {
        this.setEmail(email);
        return this;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public ChefEtablissement getChefEtablissement() {
        return this.chefEtablissement;
    }

    public void setChefEtablissement(ChefEtablissement chefEtablissement) {
        this.chefEtablissement = chefEtablissement;
    }

    public Apprenant chefEtablissement(ChefEtablissement chefEtablissement) {
        this.setChefEtablissement(chefEtablissement);
        return this;
    }

    public Etablissement getEtablissement() {
        return this.etablissement;
    }

    public void setEtablissement(Etablissement etablissement) {
        this.etablissement = etablissement;
    }

    public Apprenant etablissement(Etablissement etablissement) {
        this.setEtablissement(etablissement);
        return this;
    }

    public NomLycetech getNomLycetech() {
        return this.nomLycetech;
    }

    public void setNomLycetech(NomLycetech nomLycetech) {
        this.nomLycetech = nomLycetech;
    }

    public Apprenant nomLycetech(NomLycetech nomLycetech) {
        this.setNomLycetech(nomLycetech);
        return this;
    }

    public NomCFP getNomCFP() {
        return this.nomCFP;
    }

    public void setNomCFP(NomCFP nomCFP) {
        this.nomCFP = nomCFP;
    }

    public Apprenant nomCFP(NomCFP nomCFP) {
        this.setNomCFP(nomCFP);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Apprenant)) {
            return false;
        }
        return id != null && id.equals(((Apprenant) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Apprenant{" +
            "id=" + getId() +
            ", matriculeApp='" + getMatriculeApp() + "'" +
            ", nom='" + getNom() + "'" +
            ", prenom='" + getPrenom() + "'" +
            ", sexe='" + getSexe() + "'" +
            ", telephone='" + getTelephone() + "'" +
            ", email='" + getEmail() + "'" +
            "}";
    }
}
