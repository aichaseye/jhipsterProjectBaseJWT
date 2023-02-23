package mfpai.gouv.sn.web.rest;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import mfpai.gouv.sn.domain.NomLycetech;
import mfpai.gouv.sn.repository.NomLycetechRepository;
import mfpai.gouv.sn.service.NomLycetechService;
import mfpai.gouv.sn.web.rest.errors.BadRequestAlertException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.PaginationUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link mfpai.gouv.sn.domain.NomLycetech}.
 */
@RestController
@RequestMapping("/api")
public class NomLycetechResource {

    private final Logger log = LoggerFactory.getLogger(NomLycetechResource.class);

    private static final String ENTITY_NAME = "nomLycetech";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final NomLycetechService nomLycetechService;

    private final NomLycetechRepository nomLycetechRepository;

    public NomLycetechResource(NomLycetechService nomLycetechService, NomLycetechRepository nomLycetechRepository) {
        this.nomLycetechService = nomLycetechService;
        this.nomLycetechRepository = nomLycetechRepository;
    }

    /**
     * {@code POST  /nom-lyceteches} : Create a new nomLycetech.
     *
     * @param nomLycetech the nomLycetech to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new nomLycetech, or with status {@code 400 (Bad Request)} if the nomLycetech has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/nom-lyceteches")
    public ResponseEntity<NomLycetech> createNomLycetech(@RequestBody NomLycetech nomLycetech) throws URISyntaxException {
        log.debug("REST request to save NomLycetech : {}", nomLycetech);
        if (nomLycetech.getId() != null) {
            throw new BadRequestAlertException("A new nomLycetech cannot already have an ID", ENTITY_NAME, "idexists");
        }
        NomLycetech result = nomLycetechService.save(nomLycetech);
        return ResponseEntity
            .created(new URI("/api/nom-lyceteches/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /nom-lyceteches/:id} : Updates an existing nomLycetech.
     *
     * @param id the id of the nomLycetech to save.
     * @param nomLycetech the nomLycetech to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated nomLycetech,
     * or with status {@code 400 (Bad Request)} if the nomLycetech is not valid,
     * or with status {@code 500 (Internal Server Error)} if the nomLycetech couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/nom-lyceteches/{id}")
    public ResponseEntity<NomLycetech> updateNomLycetech(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody NomLycetech nomLycetech
    ) throws URISyntaxException {
        log.debug("REST request to update NomLycetech : {}, {}", id, nomLycetech);
        if (nomLycetech.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, nomLycetech.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!nomLycetechRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        NomLycetech result = nomLycetechService.save(nomLycetech);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, nomLycetech.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /nom-lyceteches/:id} : Partial updates given fields of an existing nomLycetech, field will ignore if it is null
     *
     * @param id the id of the nomLycetech to save.
     * @param nomLycetech the nomLycetech to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated nomLycetech,
     * or with status {@code 400 (Bad Request)} if the nomLycetech is not valid,
     * or with status {@code 404 (Not Found)} if the nomLycetech is not found,
     * or with status {@code 500 (Internal Server Error)} if the nomLycetech couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/nom-lyceteches/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<NomLycetech> partialUpdateNomLycetech(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody NomLycetech nomLycetech
    ) throws URISyntaxException {
        log.debug("REST request to partial update NomLycetech partially : {}, {}", id, nomLycetech);
        if (nomLycetech.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, nomLycetech.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!nomLycetechRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<NomLycetech> result = nomLycetechService.partialUpdate(nomLycetech);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, nomLycetech.getId().toString())
        );
    }

    /**
     * {@code GET  /nom-lyceteches} : get all the nomLyceteches.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of nomLyceteches in body.
     */
    @GetMapping("/nom-lyceteches")
    public ResponseEntity<List<NomLycetech>> getAllNomLyceteches(@org.springdoc.api.annotations.ParameterObject Pageable pageable) {
        log.debug("REST request to get a page of NomLyceteches");
        Page<NomLycetech> page = nomLycetechService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /nom-lyceteches/:id} : get the "id" nomLycetech.
     *
     * @param id the id of the nomLycetech to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the nomLycetech, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/nom-lyceteches/{id}")
    public ResponseEntity<NomLycetech> getNomLycetech(@PathVariable Long id) {
        log.debug("REST request to get NomLycetech : {}", id);
        Optional<NomLycetech> nomLycetech = nomLycetechService.findOne(id);
        return ResponseUtil.wrapOrNotFound(nomLycetech);
    }

    /**
     * {@code DELETE  /nom-lyceteches/:id} : delete the "id" nomLycetech.
     *
     * @param id the id of the nomLycetech to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/nom-lyceteches/{id}")
    public ResponseEntity<Void> deleteNomLycetech(@PathVariable Long id) {
        log.debug("REST request to delete NomLycetech : {}", id);
        nomLycetechService.delete(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString()))
            .build();
    }
}
