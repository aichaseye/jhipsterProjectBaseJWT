package mfpai.gouv.sn.service.impl;

import java.util.Optional;
import mfpai.gouv.sn.domain.NomCFP;
import mfpai.gouv.sn.repository.NomCFPRepository;
import mfpai.gouv.sn.service.NomCFPService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link NomCFP}.
 */
@Service
@Transactional
public class NomCFPServiceImpl implements NomCFPService {

    private final Logger log = LoggerFactory.getLogger(NomCFPServiceImpl.class);

    private final NomCFPRepository nomCFPRepository;

    public NomCFPServiceImpl(NomCFPRepository nomCFPRepository) {
        this.nomCFPRepository = nomCFPRepository;
    }

    @Override
    public NomCFP save(NomCFP nomCFP) {
        log.debug("Request to save NomCFP : {}", nomCFP);
        return nomCFPRepository.save(nomCFP);
    }

    @Override
    public Optional<NomCFP> partialUpdate(NomCFP nomCFP) {
        log.debug("Request to partially update NomCFP : {}", nomCFP);

        return nomCFPRepository
            .findById(nomCFP.getId())
            .map(existingNomCFP -> {
                if (nomCFP.getNomCFP() != null) {
                    existingNomCFP.setNomCFP(nomCFP.getNomCFP());
                }

                return existingNomCFP;
            })
            .map(nomCFPRepository::save);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<NomCFP> findAll(Pageable pageable) {
        log.debug("Request to get all NomCFPS");
        return nomCFPRepository.findAll(pageable);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<NomCFP> findOne(Long id) {
        log.debug("Request to get NomCFP : {}", id);
        return nomCFPRepository.findById(id);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete NomCFP : {}", id);
        nomCFPRepository.deleteById(id);
    }
}
