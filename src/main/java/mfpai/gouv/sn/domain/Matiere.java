package mfpai.gouv.sn.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import javax.persistence.*;
import javax.validation.constraints.*;
import mfpai.gouv.sn.domain.enumeration.CodeRegion;
import mfpai.gouv.sn.domain.enumeration.NomReg;
import mfpai.gouv.sn.domain.enumeration.TypeStructure;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Matiere.
 */
@Entity
@Table(name = "matiere")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Matiere implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "nom_matiere")
    private String nomMatiere;

    @Column(name = "reference")
    private String reference;

    @Lob
    @Column(name = "image")
    private byte[] image;

    @Column(name = "image_content_type")
    private String imageContentType;

    @Column(name = "matricule_matiere", unique = true)
    private String matriculeMatiere;

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
    @Column(name = "type_structure")
    private TypeStructure typeStructure;

    @Column(name = "autre_structure")
    private String autreStructure;

    @Column(name = "annee_affectation")
    private Integer anneeAffectation;

    @ManyToOne
    @JsonIgnoreProperties(value = { "user", "matieres" }, allowSetters = true)
    private ComptableMatiere comptableMatiere;

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

    public Matiere id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNomMatiere() {
        return this.nomMatiere;
    }

    public Matiere nomMatiere(String nomMatiere) {
        this.setNomMatiere(nomMatiere);
        return this;
    }

    public void setNomMatiere(String nomMatiere) {
        this.nomMatiere = nomMatiere;
    }

    public String getReference() {
        return this.reference;
    }

    public Matiere reference(String reference) {
        this.setReference(reference);
        return this;
    }

    public void setReference(String reference) {
        this.reference = reference;
    }

    public byte[] getImage() {
        return this.image;
    }

    public Matiere image(byte[] image) {
        this.setImage(image);
        return this;
    }

    public void setImage(byte[] image) {
        this.image = image;
    }

    public String getImageContentType() {
        return this.imageContentType;
    }

    public Matiere imageContentType(String imageContentType) {
        this.imageContentType = imageContentType;
        return this;
    }

    public void setImageContentType(String imageContentType) {
        this.imageContentType = imageContentType;
    }

    public String getMatriculeMatiere() {
        return this.matriculeMatiere;
    }

    public Matiere matriculeMatiere(String matriculeMatiere) {
        this.setMatriculeMatiere(matriculeMatiere);
        return this;
    }

    public void setMatriculeMatiere(String matriculeMatiere) {
        this.matriculeMatiere = matriculeMatiere;
    }

    public NomReg getRegion() {
        return this.region;
    }

    public Matiere region(NomReg region) {
        this.setRegion(region);
        return this;
    }

    public void setRegion(NomReg region) {
        this.region = region;
    }

    public String getAutreRegion() {
        return this.autreRegion;
    }

    public Matiere autreRegion(String autreRegion) {
        this.setAutreRegion(autreRegion);
        return this;
    }

    public void setAutreRegion(String autreRegion) {
        this.autreRegion = autreRegion;
    }

    public CodeRegion getCodeRegion() {
        return this.codeRegion;
    }

    public Matiere codeRegion(CodeRegion codeRegion) {
        this.setCodeRegion(codeRegion);
        return this;
    }

    public void setCodeRegion(CodeRegion codeRegion) {
        this.codeRegion = codeRegion;
    }

    public String getAutrecodeRegion() {
        return this.autrecodeRegion;
    }

    public Matiere autrecodeRegion(String autrecodeRegion) {
        this.setAutrecodeRegion(autrecodeRegion);
        return this;
    }

    public void setAutrecodeRegion(String autrecodeRegion) {
        this.autrecodeRegion = autrecodeRegion;
    }

    public TypeStructure getTypeStructure() {
        return this.typeStructure;
    }

    public Matiere typeStructure(TypeStructure typeStructure) {
        this.setTypeStructure(typeStructure);
        return this;
    }

    public void setTypeStructure(TypeStructure typeStructure) {
        this.typeStructure = typeStructure;
    }

    public String getAutreStructure() {
        return this.autreStructure;
    }

    public Matiere autreStructure(String autreStructure) {
        this.setAutreStructure(autreStructure);
        return this;
    }

    public void setAutreStructure(String autreStructure) {
        this.autreStructure = autreStructure;
    }

    public Integer getAnneeAffectation() {
        return this.anneeAffectation;
    }

    public Matiere anneeAffectation(Integer anneeAffectation) {
        this.setAnneeAffectation(anneeAffectation);
        return this;
    }

    public void setAnneeAffectation(Integer anneeAffectation) {
        this.anneeAffectation = anneeAffectation;
    }

    public ComptableMatiere getComptableMatiere() {
        return this.comptableMatiere;
    }

    public void setComptableMatiere(ComptableMatiere comptableMatiere) {
        this.comptableMatiere = comptableMatiere;
    }

    public Matiere comptableMatiere(ComptableMatiere comptableMatiere) {
        this.setComptableMatiere(comptableMatiere);
        return this;
    }

    public Etablissement getEtablissement() {
        return this.etablissement;
    }

    public void setEtablissement(Etablissement etablissement) {
        this.etablissement = etablissement;
    }

    public Matiere etablissement(Etablissement etablissement) {
        this.setEtablissement(etablissement);
        return this;
    }

    public NomLycetech getNomLycetech() {
        return this.nomLycetech;
    }

    public void setNomLycetech(NomLycetech nomLycetech) {
        this.nomLycetech = nomLycetech;
    }

    public Matiere nomLycetech(NomLycetech nomLycetech) {
        this.setNomLycetech(nomLycetech);
        return this;
    }

    public NomCFP getNomCFP() {
        return this.nomCFP;
    }

    public void setNomCFP(NomCFP nomCFP) {
        this.nomCFP = nomCFP;
    }

    public Matiere nomCFP(NomCFP nomCFP) {
        this.setNomCFP(nomCFP);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Matiere)) {
            return false;
        }
        return id != null && id.equals(((Matiere) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Matiere{" +
            "id=" + getId() +
            ", nomMatiere='" + getNomMatiere() + "'" +
            ", reference='" + getReference() + "'" +
            ", image='" + getImage() + "'" +
            ", imageContentType='" + getImageContentType() + "'" +
            ", matriculeMatiere='" + getMatriculeMatiere() + "'" +
            ", region='" + getRegion() + "'" +
            ", autreRegion='" + getAutreRegion() + "'" +
            ", codeRegion='" + getCodeRegion() + "'" +
            ", autrecodeRegion='" + getAutrecodeRegion() + "'" +
            ", typeStructure='" + getTypeStructure() + "'" +
            ", autreStructure='" + getAutreStructure() + "'" +
            ", anneeAffectation=" + getAnneeAffectation() +
            "}";
    }
}
