package mfpai.gouv.sn.web.rest;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import mfpai.gouv.sn.domain.NomCFP;
import mfpai.gouv.sn.repository.NomCFPRepository;
import mfpai.gouv.sn.service.NomCFPService;
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
 * REST controller for managing {@link mfpai.gouv.sn.domain.NomCFP}.
 */
@RestController
@RequestMapping("/api")
public class NomCFPResource {

    private final Logger log = LoggerFactory.getLogger(NomCFPResource.class);

    private static final String ENTITY_NAME = "nomCFP";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final NomCFPService nomCFPService;

    private final NomCFPRepository nomCFPRepository;

    public NomCFPResource(NomCFPService nomCFPService, NomCFPRepository nomCFPRepository) {
        this.nomCFPService = nomCFPService;
        this.nomCFPRepository = nomCFPRepository;
    }

    /**
     * {@code POST  /nom-cfps} : Create a new nomCFP.
     *
     * @param nomCFP the nomCFP to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new nomCFP, or with status {@code 400 (Bad Request)} if the nomCFP has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/nom-cfps")
    public ResponseEntity<NomCFP> createNomCFP(@RequestBody NomCFP nomCFP) throws URISyntaxException {
        log.debug("REST request to save NomCFP : {}", nomCFP);
        if (nomCFP.getId() != null) {
            throw new BadRequestAlertException("A new nomCFP cannot already have an ID", ENTITY_NAME, "idexists");
        }
        NomCFP result = nomCFPService.save(nomCFP);
        return ResponseEntity
            .created(new URI("/api/nom-cfps/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /nom-cfps/:id} : Updates an existing nomCFP.
     *
     * @param id the id of the nomCFP to save.
     * @param nomCFP the nomCFP to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated nomCFP,
     * or with status {@code 400 (Bad Request)} if the nomCFP is not valid,
     * or with status {@code 500 (Internal Server Error)} if the nomCFP couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/nom-cfps/{id}")
    public ResponseEntity<NomCFP> updateNomCFP(@PathVariable(value = "id", required = false) final Long id, @RequestBody NomCFP nomCFP)
        throws URISyntaxException {
        log.debug("REST request to update NomCFP : {}, {}", id, nomCFP);
        if (nomCFP.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, nomCFP.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!nomCFPRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        NomCFP result = nomCFPService.save(nomCFP);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, nomCFP.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /nom-cfps/:id} : Partial updates given fields of an existing nomCFP, field will ignore if it is null
     *
     * @param id the id of the nomCFP to save.
     * @param nomCFP the nomCFP to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated nomCFP,
     * or with status {@code 400 (Bad Request)} if the nomCFP is not valid,
     * or with status {@code 404 (Not Found)} if the nomCFP is not found,
     * or with status {@code 500 (Internal Server Error)} if the nomCFP couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/nom-cfps/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<NomCFP> partialUpdateNomCFP(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody NomCFP nomCFP
    ) throws URISyntaxException {
        log.debug("REST request to partial update NomCFP partially : {}, {}", id, nomCFP);
        if (nomCFP.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, nomCFP.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!nomCFPRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<NomCFP> result = nomCFPService.partialUpdate(nomCFP);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, nomCFP.getId().toString())
        );
    }

    /**
     * {@code GET  /nom-cfps} : get all the nomCFPS.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of nomCFPS in body.
     */
    @GetMapping("/nom-cfps")
    public ResponseEntity<List<NomCFP>> getAllNomCFPS(@org.springdoc.api.annotations.ParameterObject Pageable pageable) {
        log.debug("REST request to get a page of NomCFPS");
        Page<NomCFP> page = nomCFPService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /nom-cfps/:id} : get the "id" nomCFP.
     *
     * @param id the id of the nomCFP to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the nomCFP, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/nom-cfps/{id}")
    public ResponseEntity<NomCFP> getNomCFP(@PathVariable Long id) {
        log.debug("REST request to get NomCFP : {}", id);
        Optional<NomCFP> nomCFP = nomCFPService.findOne(id);
        return ResponseUtil.wrapOrNotFound(nomCFP);
    }

    /**
     * {@code DELETE  /nom-cfps/:id} : delete the "id" nomCFP.
     *
     * @param id the id of the nomCFP to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/nom-cfps/{id}")
    public ResponseEntity<Void> deleteNomCFP(@PathVariable Long id) {
        log.debug("REST request to delete NomCFP : {}", id);
        nomCFPService.delete(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString()))
            .build();
    }
}
