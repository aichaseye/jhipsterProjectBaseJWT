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
import mfpai.gouv.sn.domain.NomLycetech;
import mfpai.gouv.sn.repository.NomLycetechRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

/**
 * Integration tests for the {@link NomLycetechResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class NomLycetechResourceIT {

    private static final String DEFAULT_NOM_LYCEE = "AAAAAAAAAA";
    private static final String UPDATED_NOM_LYCEE = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/nom-lyceteches";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private NomLycetechRepository nomLycetechRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restNomLycetechMockMvc;

    private NomLycetech nomLycetech;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static NomLycetech createEntity(EntityManager em) {
        NomLycetech nomLycetech = new NomLycetech().nomLycee(DEFAULT_NOM_LYCEE);
        return nomLycetech;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static NomLycetech createUpdatedEntity(EntityManager em) {
        NomLycetech nomLycetech = new NomLycetech().nomLycee(UPDATED_NOM_LYCEE);
        return nomLycetech;
    }

    @BeforeEach
    public void initTest() {
        nomLycetech = createEntity(em);
    }

    @Test
    @Transactional
    void createNomLycetech() throws Exception {
        int databaseSizeBeforeCreate = nomLycetechRepository.findAll().size();
        // Create the NomLycetech
        restNomLycetechMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(nomLycetech)))
            .andExpect(status().isCreated());

        // Validate the NomLycetech in the database
        List<NomLycetech> nomLycetechList = nomLycetechRepository.findAll();
        assertThat(nomLycetechList).hasSize(databaseSizeBeforeCreate + 1);
        NomLycetech testNomLycetech = nomLycetechList.get(nomLycetechList.size() - 1);
        assertThat(testNomLycetech.getNomLycee()).isEqualTo(DEFAULT_NOM_LYCEE);
    }

    @Test
    @Transactional
    void createNomLycetechWithExistingId() throws Exception {
        // Create the NomLycetech with an existing ID
        nomLycetech.setId(1L);

        int databaseSizeBeforeCreate = nomLycetechRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restNomLycetechMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(nomLycetech)))
            .andExpect(status().isBadRequest());

        // Validate the NomLycetech in the database
        List<NomLycetech> nomLycetechList = nomLycetechRepository.findAll();
        assertThat(nomLycetechList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllNomLyceteches() throws Exception {
        // Initialize the database
        nomLycetechRepository.saveAndFlush(nomLycetech);

        // Get all the nomLycetechList
        restNomLycetechMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(nomLycetech.getId().intValue())))
            .andExpect(jsonPath("$.[*].nomLycee").value(hasItem(DEFAULT_NOM_LYCEE)));
    }

    @Test
    @Transactional
    void getNomLycetech() throws Exception {
        // Initialize the database
        nomLycetechRepository.saveAndFlush(nomLycetech);

        // Get the nomLycetech
        restNomLycetechMockMvc
            .perform(get(ENTITY_API_URL_ID, nomLycetech.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(nomLycetech.getId().intValue()))
            .andExpect(jsonPath("$.nomLycee").value(DEFAULT_NOM_LYCEE));
    }

    @Test
    @Transactional
    void getNonExistingNomLycetech() throws Exception {
        // Get the nomLycetech
        restNomLycetechMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewNomLycetech() throws Exception {
        // Initialize the database
        nomLycetechRepository.saveAndFlush(nomLycetech);

        int databaseSizeBeforeUpdate = nomLycetechRepository.findAll().size();

        // Update the nomLycetech
        NomLycetech updatedNomLycetech = nomLycetechRepository.findById(nomLycetech.getId()).get();
        // Disconnect from session so that the updates on updatedNomLycetech are not directly saved in db
        em.detach(updatedNomLycetech);
        updatedNomLycetech.nomLycee(UPDATED_NOM_LYCEE);

        restNomLycetechMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedNomLycetech.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedNomLycetech))
            )
            .andExpect(status().isOk());

        // Validate the NomLycetech in the database
        List<NomLycetech> nomLycetechList = nomLycetechRepository.findAll();
        assertThat(nomLycetechList).hasSize(databaseSizeBeforeUpdate);
        NomLycetech testNomLycetech = nomLycetechList.get(nomLycetechList.size() - 1);
        assertThat(testNomLycetech.getNomLycee()).isEqualTo(UPDATED_NOM_LYCEE);
    }

    @Test
    @Transactional
    void putNonExistingNomLycetech() throws Exception {
        int databaseSizeBeforeUpdate = nomLycetechRepository.findAll().size();
        nomLycetech.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restNomLycetechMockMvc
            .perform(
                put(ENTITY_API_URL_ID, nomLycetech.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(nomLycetech))
            )
            .andExpect(status().isBadRequest());

        // Validate the NomLycetech in the database
        List<NomLycetech> nomLycetechList = nomLycetechRepository.findAll();
        assertThat(nomLycetechList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchNomLycetech() throws Exception {
        int databaseSizeBeforeUpdate = nomLycetechRepository.findAll().size();
        nomLycetech.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restNomLycetechMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(nomLycetech))
            )
            .andExpect(status().isBadRequest());

        // Validate the NomLycetech in the database
        List<NomLycetech> nomLycetechList = nomLycetechRepository.findAll();
        assertThat(nomLycetechList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamNomLycetech() throws Exception {
        int databaseSizeBeforeUpdate = nomLycetechRepository.findAll().size();
        nomLycetech.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restNomLycetechMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(nomLycetech)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the NomLycetech in the database
        List<NomLycetech> nomLycetechList = nomLycetechRepository.findAll();
        assertThat(nomLycetechList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateNomLycetechWithPatch() throws Exception {
        // Initialize the database
        nomLycetechRepository.saveAndFlush(nomLycetech);

        int databaseSizeBeforeUpdate = nomLycetechRepository.findAll().size();

        // Update the nomLycetech using partial update
        NomLycetech partialUpdatedNomLycetech = new NomLycetech();
        partialUpdatedNomLycetech.setId(nomLycetech.getId());

        partialUpdatedNomLycetech.nomLycee(UPDATED_NOM_LYCEE);

        restNomLycetechMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedNomLycetech.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedNomLycetech))
            )
            .andExpect(status().isOk());

        // Validate the NomLycetech in the database
        List<NomLycetech> nomLycetechList = nomLycetechRepository.findAll();
        assertThat(nomLycetechList).hasSize(databaseSizeBeforeUpdate);
        NomLycetech testNomLycetech = nomLycetechList.get(nomLycetechList.size() - 1);
        assertThat(testNomLycetech.getNomLycee()).isEqualTo(UPDATED_NOM_LYCEE);
    }

    @Test
    @Transactional
    void fullUpdateNomLycetechWithPatch() throws Exception {
        // Initialize the database
        nomLycetechRepository.saveAndFlush(nomLycetech);

        int databaseSizeBeforeUpdate = nomLycetechRepository.findAll().size();

        // Update the nomLycetech using partial update
        NomLycetech partialUpdatedNomLycetech = new NomLycetech();
        partialUpdatedNomLycetech.setId(nomLycetech.getId());

        partialUpdatedNomLycetech.nomLycee(UPDATED_NOM_LYCEE);

        restNomLycetechMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedNomLycetech.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedNomLycetech))
            )
            .andExpect(status().isOk());

        // Validate the NomLycetech in the database
        List<NomLycetech> nomLycetechList = nomLycetechRepository.findAll();
        assertThat(nomLycetechList).hasSize(databaseSizeBeforeUpdate);
        NomLycetech testNomLycetech = nomLycetechList.get(nomLycetechList.size() - 1);
        assertThat(testNomLycetech.getNomLycee()).isEqualTo(UPDATED_NOM_LYCEE);
    }

    @Test
    @Transactional
    void patchNonExistingNomLycetech() throws Exception {
        int databaseSizeBeforeUpdate = nomLycetechRepository.findAll().size();
        nomLycetech.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restNomLycetechMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, nomLycetech.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(nomLycetech))
            )
            .andExpect(status().isBadRequest());

        // Validate the NomLycetech in the database
        List<NomLycetech> nomLycetechList = nomLycetechRepository.findAll();
        assertThat(nomLycetechList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchNomLycetech() throws Exception {
        int databaseSizeBeforeUpdate = nomLycetechRepository.findAll().size();
        nomLycetech.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restNomLycetechMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(nomLycetech))
            )
            .andExpect(status().isBadRequest());

        // Validate the NomLycetech in the database
        List<NomLycetech> nomLycetechList = nomLycetechRepository.findAll();
        assertThat(nomLycetechList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamNomLycetech() throws Exception {
        int databaseSizeBeforeUpdate = nomLycetechRepository.findAll().size();
        nomLycetech.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restNomLycetechMockMvc
            .perform(
                patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(nomLycetech))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the NomLycetech in the database
        List<NomLycetech> nomLycetechList = nomLycetechRepository.findAll();
        assertThat(nomLycetechList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteNomLycetech() throws Exception {
        // Initialize the database
        nomLycetechRepository.saveAndFlush(nomLycetech);

        int databaseSizeBeforeDelete = nomLycetechRepository.findAll().size();

        // Delete the nomLycetech
        restNomLycetechMockMvc
            .perform(delete(ENTITY_API_URL_ID, nomLycetech.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<NomLycetech> nomLycetechList = nomLycetechRepository.findAll();
        assertThat(nomLycetechList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
