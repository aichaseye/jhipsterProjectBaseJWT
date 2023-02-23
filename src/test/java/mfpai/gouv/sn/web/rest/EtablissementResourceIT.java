package mfpai.gouv.sn.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import java.util.List;
import java.util.Random;
import java.util.concurrent.atomic.AtomicLong;
import javax.persistence.EntityManager;
import mfpai.gouv.sn.IntegrationTest;
import mfpai.gouv.sn.domain.Etablissement;
import mfpai.gouv.sn.domain.enumeration.CodeRegion;
import mfpai.gouv.sn.domain.enumeration.NomDep;
import mfpai.gouv.sn.domain.enumeration.NomReg;
import mfpai.gouv.sn.domain.enumeration.StatutEtab;
import mfpai.gouv.sn.domain.enumeration.TypeEtab;
import mfpai.gouv.sn.domain.enumeration.TypeInspection;
import mfpai.gouv.sn.repository.EtablissementRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

/**
 * Integration tests for the {@link EtablissementResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class EtablissementResourceIT {

    private static final String DEFAULT_MATRICULE_ETAB = "AAAAAAAAAA";
    private static final String UPDATED_MATRICULE_ETAB = "BBBBBBBBBB";

    private static final TypeEtab DEFAULT_TYPE_ETAB = TypeEtab.LyceeTechnique;
    private static final TypeEtab UPDATED_TYPE_ETAB = TypeEtab.CFP;

    private static final String DEFAULT_AUTRENOM_ETAB = "AAAAAAAAAA";
    private static final String UPDATED_AUTRENOM_ETAB = "BBBBBBBBBB";

    private static final Integer DEFAULT_ANNEE_CRE = 1;
    private static final Integer UPDATED_ANNEE_CRE = 2;

    private static final StatutEtab DEFAULT_STATUT = StatutEtab.Prive;
    private static final StatutEtab UPDATED_STATUT = StatutEtab.Public;

    private static final NomReg DEFAULT_REGION = NomReg.DAKAR;
    private static final NomReg UPDATED_REGION = NomReg.DIOURBEL;

    private static final String DEFAULT_AUTRE_REGION = "AAAAAAAAAA";
    private static final String UPDATED_AUTRE_REGION = "BBBBBBBBBB";

    private static final NomDep DEFAULT_DEPARTEMENT = NomDep.Dakar;
    private static final NomDep UPDATED_DEPARTEMENT = NomDep.Pikine;

    private static final String DEFAULT_AUTRE_DEP = "AAAAAAAAAA";
    private static final String UPDATED_AUTRE_DEP = "BBBBBBBBBB";

    private static final String DEFAULT_COMMUNE = "AAAAAAAAAA";
    private static final String UPDATED_COMMUNE = "BBBBBBBBBB";

    private static final CodeRegion DEFAULT_CODE_REGION = CodeRegion.C01;
    private static final CodeRegion UPDATED_CODE_REGION = CodeRegion.C02;

    private static final String DEFAULT_AUTRECODE_REGION = "AAAAAAAAAA";
    private static final String UPDATED_AUTRECODE_REGION = "BBBBBBBBBB";

    private static final String DEFAULT_EMAIL_ETAB = "AAAAAAAAAA";
    private static final String UPDATED_EMAIL_ETAB = "BBBBBBBBBB";

    private static final TypeInspection DEFAULT_TYPE_INSP = TypeInspection.IA;
    private static final TypeInspection UPDATED_TYPE_INSP = TypeInspection.IEF;

    private static final String ENTITY_API_URL = "/api/etablissements";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private EtablissementRepository etablissementRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restEtablissementMockMvc;

    private Etablissement etablissement;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Etablissement createEntity(EntityManager em) {
        Etablissement etablissement = new Etablissement()
            .matriculeEtab(DEFAULT_MATRICULE_ETAB)
            .typeEtab(DEFAULT_TYPE_ETAB)
            .autrenomEtab(DEFAULT_AUTRENOM_ETAB)
            .anneeCre(DEFAULT_ANNEE_CRE)
            .statut(DEFAULT_STATUT)
            .region(DEFAULT_REGION)
            .autreRegion(DEFAULT_AUTRE_REGION)
            .departement(DEFAULT_DEPARTEMENT)
            .autreDep(DEFAULT_AUTRE_DEP)
            .commune(DEFAULT_COMMUNE)
            .codeRegion(DEFAULT_CODE_REGION)
            .autrecodeRegion(DEFAULT_AUTRECODE_REGION)
            .emailEtab(DEFAULT_EMAIL_ETAB)
            .typeInsp(DEFAULT_TYPE_INSP);
        return etablissement;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Etablissement createUpdatedEntity(EntityManager em) {
        Etablissement etablissement = new Etablissement()
            .matriculeEtab(UPDATED_MATRICULE_ETAB)
            .typeEtab(UPDATED_TYPE_ETAB)
            .autrenomEtab(UPDATED_AUTRENOM_ETAB)
            .anneeCre(UPDATED_ANNEE_CRE)
            .statut(UPDATED_STATUT)
            .region(UPDATED_REGION)
            .autreRegion(UPDATED_AUTRE_REGION)
            .departement(UPDATED_DEPARTEMENT)
            .autreDep(UPDATED_AUTRE_DEP)
            .commune(UPDATED_COMMUNE)
            .codeRegion(UPDATED_CODE_REGION)
            .autrecodeRegion(UPDATED_AUTRECODE_REGION)
            .emailEtab(UPDATED_EMAIL_ETAB)
            .typeInsp(UPDATED_TYPE_INSP);
        return etablissement;
    }

    @BeforeEach
    public void initTest() {
        etablissement = createEntity(em);
    }

    @Test
    @Transactional
    void createEtablissement() throws Exception {
        int databaseSizeBeforeCreate = etablissementRepository.findAll().size();
        // Create the Etablissement
        restEtablissementMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(etablissement)))
            .andExpect(status().isCreated());

        // Validate the Etablissement in the database
        List<Etablissement> etablissementList = etablissementRepository.findAll();
        assertThat(etablissementList).hasSize(databaseSizeBeforeCreate + 1);
        Etablissement testEtablissement = etablissementList.get(etablissementList.size() - 1);
        assertThat(testEtablissement.getMatriculeEtab()).isEqualTo(DEFAULT_MATRICULE_ETAB);
        assertThat(testEtablissement.getTypeEtab()).isEqualTo(DEFAULT_TYPE_ETAB);
        assertThat(testEtablissement.getAutrenomEtab()).isEqualTo(DEFAULT_AUTRENOM_ETAB);
        assertThat(testEtablissement.getAnneeCre()).isEqualTo(DEFAULT_ANNEE_CRE);
        assertThat(testEtablissement.getStatut()).isEqualTo(DEFAULT_STATUT);
        assertThat(testEtablissement.getRegion()).isEqualTo(DEFAULT_REGION);
        assertThat(testEtablissement.getAutreRegion()).isEqualTo(DEFAULT_AUTRE_REGION);
        assertThat(testEtablissement.getDepartement()).isEqualTo(DEFAULT_DEPARTEMENT);
        assertThat(testEtablissement.getAutreDep()).isEqualTo(DEFAULT_AUTRE_DEP);
        assertThat(testEtablissement.getCommune()).isEqualTo(DEFAULT_COMMUNE);
        assertThat(testEtablissement.getCodeRegion()).isEqualTo(DEFAULT_CODE_REGION);
        assertThat(testEtablissement.getAutrecodeRegion()).isEqualTo(DEFAULT_AUTRECODE_REGION);
        assertThat(testEtablissement.getEmailEtab()).isEqualTo(DEFAULT_EMAIL_ETAB);
        assertThat(testEtablissement.getTypeInsp()).isEqualTo(DEFAULT_TYPE_INSP);
    }

    @Test
    @Transactional
    void createEtablissementWithExistingId() throws Exception {
        // Create the Etablissement with an existing ID
        etablissement.setId(1L);

        int databaseSizeBeforeCreate = etablissementRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restEtablissementMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(etablissement)))
            .andExpect(status().isBadRequest());

        // Validate the Etablissement in the database
        List<Etablissement> etablissementList = etablissementRepository.findAll();
        assertThat(etablissementList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void checkTypeEtabIsRequired() throws Exception {
        int databaseSizeBeforeTest = etablissementRepository.findAll().size();
        // set the field null
        etablissement.setTypeEtab(null);

        // Create the Etablissement, which fails.

        restEtablissementMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(etablissement)))
            .andExpect(status().isBadRequest());

        List<Etablissement> etablissementList = etablissementRepository.findAll();
        assertThat(etablissementList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void getAllEtablissements() throws Exception {
        // Initialize the database
        etablissementRepository.saveAndFlush(etablissement);

        // Get all the etablissementList
        restEtablissementMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(etablissement.getId().intValue())))
            .andExpect(jsonPath("$.[*].matriculeEtab").value(hasItem(DEFAULT_MATRICULE_ETAB)))
            .andExpect(jsonPath("$.[*].typeEtab").value(hasItem(DEFAULT_TYPE_ETAB.toString())))
            .andExpect(jsonPath("$.[*].autrenomEtab").value(hasItem(DEFAULT_AUTRENOM_ETAB)))
            .andExpect(jsonPath("$.[*].anneeCre").value(hasItem(DEFAULT_ANNEE_CRE)))
            .andExpect(jsonPath("$.[*].statut").value(hasItem(DEFAULT_STATUT.toString())))
            .andExpect(jsonPath("$.[*].region").value(hasItem(DEFAULT_REGION.toString())))
            .andExpect(jsonPath("$.[*].autreRegion").value(hasItem(DEFAULT_AUTRE_REGION)))
            .andExpect(jsonPath("$.[*].departement").value(hasItem(DEFAULT_DEPARTEMENT.toString())))
            .andExpect(jsonPath("$.[*].autreDep").value(hasItem(DEFAULT_AUTRE_DEP)))
            .andExpect(jsonPath("$.[*].commune").value(hasItem(DEFAULT_COMMUNE)))
            .andExpect(jsonPath("$.[*].codeRegion").value(hasItem(DEFAULT_CODE_REGION.toString())))
            .andExpect(jsonPath("$.[*].autrecodeRegion").value(hasItem(DEFAULT_AUTRECODE_REGION)))
            .andExpect(jsonPath("$.[*].emailEtab").value(hasItem(DEFAULT_EMAIL_ETAB)))
            .andExpect(jsonPath("$.[*].typeInsp").value(hasItem(DEFAULT_TYPE_INSP.toString())));
    }

    @Test
    @Transactional
    void getEtablissement() throws Exception {
        // Initialize the database
        etablissementRepository.saveAndFlush(etablissement);

        // Get the etablissement
        restEtablissementMockMvc
            .perform(get(ENTITY_API_URL_ID, etablissement.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(etablissement.getId().intValue()))
            .andExpect(jsonPath("$.matriculeEtab").value(DEFAULT_MATRICULE_ETAB))
            .andExpect(jsonPath("$.typeEtab").value(DEFAULT_TYPE_ETAB.toString()))
            .andExpect(jsonPath("$.autrenomEtab").value(DEFAULT_AUTRENOM_ETAB))
            .andExpect(jsonPath("$.anneeCre").value(DEFAULT_ANNEE_CRE))
            .andExpect(jsonPath("$.statut").value(DEFAULT_STATUT.toString()))
            .andExpect(jsonPath("$.region").value(DEFAULT_REGION.toString()))
            .andExpect(jsonPath("$.autreRegion").value(DEFAULT_AUTRE_REGION))
            .andExpect(jsonPath("$.departement").value(DEFAULT_DEPARTEMENT.toString()))
            .andExpect(jsonPath("$.autreDep").value(DEFAULT_AUTRE_DEP))
            .andExpect(jsonPath("$.commune").value(DEFAULT_COMMUNE))
            .andExpect(jsonPath("$.codeRegion").value(DEFAULT_CODE_REGION.toString()))
            .andExpect(jsonPath("$.autrecodeRegion").value(DEFAULT_AUTRECODE_REGION))
            .andExpect(jsonPath("$.emailEtab").value(DEFAULT_EMAIL_ETAB))
            .andExpect(jsonPath("$.typeInsp").value(DEFAULT_TYPE_INSP.toString()));
    }

    @Test
    @Transactional
    void getNonExistingEtablissement() throws Exception {
        // Get the etablissement
        restEtablissementMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewEtablissement() throws Exception {
        // Initialize the database
        etablissementRepository.saveAndFlush(etablissement);

        int databaseSizeBeforeUpdate = etablissementRepository.findAll().size();

        // Update the etablissement
        Etablissement updatedEtablissement = etablissementRepository.findById(etablissement.getId()).get();
        // Disconnect from session so that the updates on updatedEtablissement are not directly saved in db
        em.detach(updatedEtablissement);
        updatedEtablissement
            .matriculeEtab(UPDATED_MATRICULE_ETAB)
            .typeEtab(UPDATED_TYPE_ETAB)
            .autrenomEtab(UPDATED_AUTRENOM_ETAB)
            .anneeCre(UPDATED_ANNEE_CRE)
            .statut(UPDATED_STATUT)
            .region(UPDATED_REGION)
            .autreRegion(UPDATED_AUTRE_REGION)
            .departement(UPDATED_DEPARTEMENT)
            .autreDep(UPDATED_AUTRE_DEP)
            .commune(UPDATED_COMMUNE)
            .codeRegion(UPDATED_CODE_REGION)
            .autrecodeRegion(UPDATED_AUTRECODE_REGION)
            .emailEtab(UPDATED_EMAIL_ETAB)
            .typeInsp(UPDATED_TYPE_INSP);

        restEtablissementMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedEtablissement.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedEtablissement))
            )
            .andExpect(status().isOk());

        // Validate the Etablissement in the database
        List<Etablissement> etablissementList = etablissementRepository.findAll();
        assertThat(etablissementList).hasSize(databaseSizeBeforeUpdate);
        Etablissement testEtablissement = etablissementList.get(etablissementList.size() - 1);
        assertThat(testEtablissement.getMatriculeEtab()).isEqualTo(UPDATED_MATRICULE_ETAB);
        assertThat(testEtablissement.getTypeEtab()).isEqualTo(UPDATED_TYPE_ETAB);
        assertThat(testEtablissement.getAutrenomEtab()).isEqualTo(UPDATED_AUTRENOM_ETAB);
        assertThat(testEtablissement.getAnneeCre()).isEqualTo(UPDATED_ANNEE_CRE);
        assertThat(testEtablissement.getStatut()).isEqualTo(UPDATED_STATUT);
        assertThat(testEtablissement.getRegion()).isEqualTo(UPDATED_REGION);
        assertThat(testEtablissement.getAutreRegion()).isEqualTo(UPDATED_AUTRE_REGION);
        assertThat(testEtablissement.getDepartement()).isEqualTo(UPDATED_DEPARTEMENT);
        assertThat(testEtablissement.getAutreDep()).isEqualTo(UPDATED_AUTRE_DEP);
        assertThat(testEtablissement.getCommune()).isEqualTo(UPDATED_COMMUNE);
        assertThat(testEtablissement.getCodeRegion()).isEqualTo(UPDATED_CODE_REGION);
        assertThat(testEtablissement.getAutrecodeRegion()).isEqualTo(UPDATED_AUTRECODE_REGION);
        assertThat(testEtablissement.getEmailEtab()).isEqualTo(UPDATED_EMAIL_ETAB);
        assertThat(testEtablissement.getTypeInsp()).isEqualTo(UPDATED_TYPE_INSP);
    }

    @Test
    @Transactional
    void putNonExistingEtablissement() throws Exception {
        int databaseSizeBeforeUpdate = etablissementRepository.findAll().size();
        etablissement.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restEtablissementMockMvc
            .perform(
                put(ENTITY_API_URL_ID, etablissement.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(etablissement))
            )
            .andExpect(status().isBadRequest());

        // Validate the Etablissement in the database
        List<Etablissement> etablissementList = etablissementRepository.findAll();
        assertThat(etablissementList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchEtablissement() throws Exception {
        int databaseSizeBeforeUpdate = etablissementRepository.findAll().size();
        etablissement.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restEtablissementMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(etablissement))
            )
            .andExpect(status().isBadRequest());

        // Validate the Etablissement in the database
        List<Etablissement> etablissementList = etablissementRepository.findAll();
        assertThat(etablissementList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamEtablissement() throws Exception {
        int databaseSizeBeforeUpdate = etablissementRepository.findAll().size();
        etablissement.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restEtablissementMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(etablissement)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Etablissement in the database
        List<Etablissement> etablissementList = etablissementRepository.findAll();
        assertThat(etablissementList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateEtablissementWithPatch() throws Exception {
        // Initialize the database
        etablissementRepository.saveAndFlush(etablissement);

        int databaseSizeBeforeUpdate = etablissementRepository.findAll().size();

        // Update the etablissement using partial update
        Etablissement partialUpdatedEtablissement = new Etablissement();
        partialUpdatedEtablissement.setId(etablissement.getId());

        partialUpdatedEtablissement
            .typeEtab(UPDATED_TYPE_ETAB)
            .statut(UPDATED_STATUT)
            .region(UPDATED_REGION)
            .autreRegion(UPDATED_AUTRE_REGION)
            .commune(UPDATED_COMMUNE)
            .typeInsp(UPDATED_TYPE_INSP);

        restEtablissementMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedEtablissement.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedEtablissement))
            )
            .andExpect(status().isOk());

        // Validate the Etablissement in the database
        List<Etablissement> etablissementList = etablissementRepository.findAll();
        assertThat(etablissementList).hasSize(databaseSizeBeforeUpdate);
        Etablissement testEtablissement = etablissementList.get(etablissementList.size() - 1);
        assertThat(testEtablissement.getMatriculeEtab()).isEqualTo(DEFAULT_MATRICULE_ETAB);
        assertThat(testEtablissement.getTypeEtab()).isEqualTo(UPDATED_TYPE_ETAB);
        assertThat(testEtablissement.getAutrenomEtab()).isEqualTo(DEFAULT_AUTRENOM_ETAB);
        assertThat(testEtablissement.getAnneeCre()).isEqualTo(DEFAULT_ANNEE_CRE);
        assertThat(testEtablissement.getStatut()).isEqualTo(UPDATED_STATUT);
        assertThat(testEtablissement.getRegion()).isEqualTo(UPDATED_REGION);
        assertThat(testEtablissement.getAutreRegion()).isEqualTo(UPDATED_AUTRE_REGION);
        assertThat(testEtablissement.getDepartement()).isEqualTo(DEFAULT_DEPARTEMENT);
        assertThat(testEtablissement.getAutreDep()).isEqualTo(DEFAULT_AUTRE_DEP);
        assertThat(testEtablissement.getCommune()).isEqualTo(UPDATED_COMMUNE);
        assertThat(testEtablissement.getCodeRegion()).isEqualTo(DEFAULT_CODE_REGION);
        assertThat(testEtablissement.getAutrecodeRegion()).isEqualTo(DEFAULT_AUTRECODE_REGION);
        assertThat(testEtablissement.getEmailEtab()).isEqualTo(DEFAULT_EMAIL_ETAB);
        assertThat(testEtablissement.getTypeInsp()).isEqualTo(UPDATED_TYPE_INSP);
    }

    @Test
    @Transactional
    void fullUpdateEtablissementWithPatch() throws Exception {
        // Initialize the database
        etablissementRepository.saveAndFlush(etablissement);

        int databaseSizeBeforeUpdate = etablissementRepository.findAll().size();

        // Update the etablissement using partial update
        Etablissement partialUpdatedEtablissement = new Etablissement();
        partialUpdatedEtablissement.setId(etablissement.getId());

        partialUpdatedEtablissement
            .matriculeEtab(UPDATED_MATRICULE_ETAB)
            .typeEtab(UPDATED_TYPE_ETAB)
            .autrenomEtab(UPDATED_AUTRENOM_ETAB)
            .anneeCre(UPDATED_ANNEE_CRE)
            .statut(UPDATED_STATUT)
            .region(UPDATED_REGION)
            .autreRegion(UPDATED_AUTRE_REGION)
            .departement(UPDATED_DEPARTEMENT)
            .autreDep(UPDATED_AUTRE_DEP)
            .commune(UPDATED_COMMUNE)
            .codeRegion(UPDATED_CODE_REGION)
            .autrecodeRegion(UPDATED_AUTRECODE_REGION)
            .emailEtab(UPDATED_EMAIL_ETAB)
            .typeInsp(UPDATED_TYPE_INSP);

        restEtablissementMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedEtablissement.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedEtablissement))
            )
            .andExpect(status().isOk());

        // Validate the Etablissement in the database
        List<Etablissement> etablissementList = etablissementRepository.findAll();
        assertThat(etablissementList).hasSize(databaseSizeBeforeUpdate);
        Etablissement testEtablissement = etablissementList.get(etablissementList.size() - 1);
        assertThat(testEtablissement.getMatriculeEtab()).isEqualTo(UPDATED_MATRICULE_ETAB);
        assertThat(testEtablissement.getTypeEtab()).isEqualTo(UPDATED_TYPE_ETAB);
        assertThat(testEtablissement.getAutrenomEtab()).isEqualTo(UPDATED_AUTRENOM_ETAB);
        assertThat(testEtablissement.getAnneeCre()).isEqualTo(UPDATED_ANNEE_CRE);
        assertThat(testEtablissement.getStatut()).isEqualTo(UPDATED_STATUT);
        assertThat(testEtablissement.getRegion()).isEqualTo(UPDATED_REGION);
        assertThat(testEtablissement.getAutreRegion()).isEqualTo(UPDATED_AUTRE_REGION);
        assertThat(testEtablissement.getDepartement()).isEqualTo(UPDATED_DEPARTEMENT);
        assertThat(testEtablissement.getAutreDep()).isEqualTo(UPDATED_AUTRE_DEP);
        assertThat(testEtablissement.getCommune()).isEqualTo(UPDATED_COMMUNE);
        assertThat(testEtablissement.getCodeRegion()).isEqualTo(UPDATED_CODE_REGION);
        assertThat(testEtablissement.getAutrecodeRegion()).isEqualTo(UPDATED_AUTRECODE_REGION);
        assertThat(testEtablissement.getEmailEtab()).isEqualTo(UPDATED_EMAIL_ETAB);
        assertThat(testEtablissement.getTypeInsp()).isEqualTo(UPDATED_TYPE_INSP);
    }

    @Test
    @Transactional
    void patchNonExistingEtablissement() throws Exception {
        int databaseSizeBeforeUpdate = etablissementRepository.findAll().size();
        etablissement.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restEtablissementMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, etablissement.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(etablissement))
            )
            .andExpect(status().isBadRequest());

        // Validate the Etablissement in the database
        List<Etablissement> etablissementList = etablissementRepository.findAll();
        assertThat(etablissementList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchEtablissement() throws Exception {
        int databaseSizeBeforeUpdate = etablissementRepository.findAll().size();
        etablissement.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restEtablissementMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(etablissement))
            )
            .andExpect(status().isBadRequest());

        // Validate the Etablissement in the database
        List<Etablissement> etablissementList = etablissementRepository.findAll();
        assertThat(etablissementList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamEtablissement() throws Exception {
        int databaseSizeBeforeUpdate = etablissementRepository.findAll().size();
        etablissement.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restEtablissementMockMvc
            .perform(
                patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(etablissement))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the Etablissement in the database
        List<Etablissement> etablissementList = etablissementRepository.findAll();
        assertThat(etablissementList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteEtablissement() throws Exception {
        // Initialize the database
        etablissementRepository.saveAndFlush(etablissement);

        int databaseSizeBeforeDelete = etablissementRepository.findAll().size();

        // Delete the etablissement
        restEtablissementMockMvc
            .perform(delete(ENTITY_API_URL_ID, etablissement.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Etablissement> etablissementList = etablissementRepository.findAll();
        assertThat(etablissementList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
