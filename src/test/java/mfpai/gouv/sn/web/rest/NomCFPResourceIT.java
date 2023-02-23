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
import mfpai.gouv.sn.domain.NomCFP;
import mfpai.gouv.sn.repository.NomCFPRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

/**
 * Integration tests for the {@link NomCFPResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class NomCFPResourceIT {

    private static final String DEFAULT_NOM_CFP = "AAAAAAAAAA";
    private static final String UPDATED_NOM_CFP = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/nom-cfps";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private NomCFPRepository nomCFPRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restNomCFPMockMvc;

    private NomCFP nomCFP;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static NomCFP createEntity(EntityManager em) {
        NomCFP nomCFP = new NomCFP().nomCFP(DEFAULT_NOM_CFP);
        return nomCFP;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static NomCFP createUpdatedEntity(EntityManager em) {
        NomCFP nomCFP = new NomCFP().nomCFP(UPDATED_NOM_CFP);
        return nomCFP;
    }

    @BeforeEach
    public void initTest() {
        nomCFP = createEntity(em);
    }

    @Test
    @Transactional
    void createNomCFP() throws Exception {
        int databaseSizeBeforeCreate = nomCFPRepository.findAll().size();
        // Create the NomCFP
        restNomCFPMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(nomCFP)))
            .andExpect(status().isCreated());

        // Validate the NomCFP in the database
        List<NomCFP> nomCFPList = nomCFPRepository.findAll();
        assertThat(nomCFPList).hasSize(databaseSizeBeforeCreate + 1);
        NomCFP testNomCFP = nomCFPList.get(nomCFPList.size() - 1);
        assertThat(testNomCFP.getNomCFP()).isEqualTo(DEFAULT_NOM_CFP);
    }

    @Test
    @Transactional
    void createNomCFPWithExistingId() throws Exception {
        // Create the NomCFP with an existing ID
        nomCFP.setId(1L);

        int databaseSizeBeforeCreate = nomCFPRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restNomCFPMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(nomCFP)))
            .andExpect(status().isBadRequest());

        // Validate the NomCFP in the database
        List<NomCFP> nomCFPList = nomCFPRepository.findAll();
        assertThat(nomCFPList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllNomCFPS() throws Exception {
        // Initialize the database
        nomCFPRepository.saveAndFlush(nomCFP);

        // Get all the nomCFPList
        restNomCFPMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(nomCFP.getId().intValue())))
            .andExpect(jsonPath("$.[*].nomCFP").value(hasItem(DEFAULT_NOM_CFP)));
    }

    @Test
    @Transactional
    void getNomCFP() throws Exception {
        // Initialize the database
        nomCFPRepository.saveAndFlush(nomCFP);

        // Get the nomCFP
        restNomCFPMockMvc
            .perform(get(ENTITY_API_URL_ID, nomCFP.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(nomCFP.getId().intValue()))
            .andExpect(jsonPath("$.nomCFP").value(DEFAULT_NOM_CFP));
    }

    @Test
    @Transactional
    void getNonExistingNomCFP() throws Exception {
        // Get the nomCFP
        restNomCFPMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewNomCFP() throws Exception {
        // Initialize the database
        nomCFPRepository.saveAndFlush(nomCFP);

        int databaseSizeBeforeUpdate = nomCFPRepository.findAll().size();

        // Update the nomCFP
        NomCFP updatedNomCFP = nomCFPRepository.findById(nomCFP.getId()).get();
        // Disconnect from session so that the updates on updatedNomCFP are not directly saved in db
        em.detach(updatedNomCFP);
        updatedNomCFP.nomCFP(UPDATED_NOM_CFP);

        restNomCFPMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedNomCFP.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedNomCFP))
            )
            .andExpect(status().isOk());

        // Validate the NomCFP in the database
        List<NomCFP> nomCFPList = nomCFPRepository.findAll();
        assertThat(nomCFPList).hasSize(databaseSizeBeforeUpdate);
        NomCFP testNomCFP = nomCFPList.get(nomCFPList.size() - 1);
        assertThat(testNomCFP.getNomCFP()).isEqualTo(UPDATED_NOM_CFP);
    }

    @Test
    @Transactional
    void putNonExistingNomCFP() throws Exception {
        int databaseSizeBeforeUpdate = nomCFPRepository.findAll().size();
        nomCFP.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restNomCFPMockMvc
            .perform(
                put(ENTITY_API_URL_ID, nomCFP.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(nomCFP))
            )
            .andExpect(status().isBadRequest());

        // Validate the NomCFP in the database
        List<NomCFP> nomCFPList = nomCFPRepository.findAll();
        assertThat(nomCFPList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchNomCFP() throws Exception {
        int databaseSizeBeforeUpdate = nomCFPRepository.findAll().size();
        nomCFP.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restNomCFPMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(nomCFP))
            )
            .andExpect(status().isBadRequest());

        // Validate the NomCFP in the database
        List<NomCFP> nomCFPList = nomCFPRepository.findAll();
        assertThat(nomCFPList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamNomCFP() throws Exception {
        int databaseSizeBeforeUpdate = nomCFPRepository.findAll().size();
        nomCFP.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restNomCFPMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(nomCFP)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the NomCFP in the database
        List<NomCFP> nomCFPList = nomCFPRepository.findAll();
        assertThat(nomCFPList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateNomCFPWithPatch() throws Exception {
        // Initialize the database
        nomCFPRepository.saveAndFlush(nomCFP);

        int databaseSizeBeforeUpdate = nomCFPRepository.findAll().size();

        // Update the nomCFP using partial update
        NomCFP partialUpdatedNomCFP = new NomCFP();
        partialUpdatedNomCFP.setId(nomCFP.getId());

        restNomCFPMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedNomCFP.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedNomCFP))
            )
            .andExpect(status().isOk());

        // Validate the NomCFP in the database
        List<NomCFP> nomCFPList = nomCFPRepository.findAll();
        assertThat(nomCFPList).hasSize(databaseSizeBeforeUpdate);
        NomCFP testNomCFP = nomCFPList.get(nomCFPList.size() - 1);
        assertThat(testNomCFP.getNomCFP()).isEqualTo(DEFAULT_NOM_CFP);
    }

    @Test
    @Transactional
    void fullUpdateNomCFPWithPatch() throws Exception {
        // Initialize the database
        nomCFPRepository.saveAndFlush(nomCFP);

        int databaseSizeBeforeUpdate = nomCFPRepository.findAll().size();

        // Update the nomCFP using partial update
        NomCFP partialUpdatedNomCFP = new NomCFP();
        partialUpdatedNomCFP.setId(nomCFP.getId());

        partialUpdatedNomCFP.nomCFP(UPDATED_NOM_CFP);

        restNomCFPMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedNomCFP.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedNomCFP))
            )
            .andExpect(status().isOk());

        // Validate the NomCFP in the database
        List<NomCFP> nomCFPList = nomCFPRepository.findAll();
        assertThat(nomCFPList).hasSize(databaseSizeBeforeUpdate);
        NomCFP testNomCFP = nomCFPList.get(nomCFPList.size() - 1);
        assertThat(testNomCFP.getNomCFP()).isEqualTo(UPDATED_NOM_CFP);
    }

    @Test
    @Transactional
    void patchNonExistingNomCFP() throws Exception {
        int databaseSizeBeforeUpdate = nomCFPRepository.findAll().size();
        nomCFP.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restNomCFPMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, nomCFP.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(nomCFP))
            )
            .andExpect(status().isBadRequest());

        // Validate the NomCFP in the database
        List<NomCFP> nomCFPList = nomCFPRepository.findAll();
        assertThat(nomCFPList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchNomCFP() throws Exception {
        int databaseSizeBeforeUpdate = nomCFPRepository.findAll().size();
        nomCFP.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restNomCFPMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(nomCFP))
            )
            .andExpect(status().isBadRequest());

        // Validate the NomCFP in the database
        List<NomCFP> nomCFPList = nomCFPRepository.findAll();
        assertThat(nomCFPList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamNomCFP() throws Exception {
        int databaseSizeBeforeUpdate = nomCFPRepository.findAll().size();
        nomCFP.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restNomCFPMockMvc
            .perform(patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(nomCFP)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the NomCFP in the database
        List<NomCFP> nomCFPList = nomCFPRepository.findAll();
        assertThat(nomCFPList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteNomCFP() throws Exception {
        // Initialize the database
        nomCFPRepository.saveAndFlush(nomCFP);

        int databaseSizeBeforeDelete = nomCFPRepository.findAll().size();

        // Delete the nomCFP
        restNomCFPMockMvc
            .perform(delete(ENTITY_API_URL_ID, nomCFP.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<NomCFP> nomCFPList = nomCFPRepository.findAll();
        assertThat(nomCFPList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
