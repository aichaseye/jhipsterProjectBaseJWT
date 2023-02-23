package mfpai.gouv.sn.service.impl;

import java.util.Optional;
import mfpai.gouv.sn.domain.NomLycetech;
import mfpai.gouv.sn.repository.NomLycetechRepository;
import mfpai.gouv.sn.service.NomLycetechService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link NomLycetech}.
 */
@Service
@Transactional
public class NomLycetechServiceImpl implements NomLycetechService {

    private final Logger log = LoggerFactory.getLogger(NomLycetechServiceImpl.class);

    private final NomLycetechRepository nomLycetechRepository;

    public NomLycetechServiceImpl(NomLycetechRepository nomLycetechRepository) {
        this.nomLycetechRepository = nomLycetechRepository;
    }

    @Override
    public NomLycetech save(NomLycetech nomLycetech) {
        log.debug("Request to save NomLycetech : {}", nomLycetech);
        return nomLycetechRepository.save(nomLycetech);
    }

    @Override
    public Optional<NomLycetech> partialUpdate(NomLycetech nomLycetech) {
        log.debug("Request to partially update NomLycetech : {}", nomLycetech);

        return nomLycetechRepository
            .findById(nomLycetech.getId())
            .map(existingNomLycetech -> {
                if (nomLycetech.getNomLycee() != null) {
                    existingNomLycetech.setNomLycee(nomLycetech.getNomLycee());
                }

                return existingNomLycetech;
            })
            .map(nomLycetechRepository::save);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<NomLycetech> findAll(Pageable pageable) {
        log.debug("Request to get all NomLyceteches");
        return nomLycetechRepository.findAll(pageable);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<NomLycetech> findOne(Long id) {
        log.debug("Request to get NomLycetech : {}", id);
        return nomLycetechRepository.findById(id);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete NomLycetech : {}", id);
        nomLycetechRepository.deleteById(id);
    }
}
