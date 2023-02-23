package mfpai.gouv.sn.service.impl;

import java.util.Optional;
import mfpai.gouv.sn.domain.Etablissement;
import mfpai.gouv.sn.repository.EtablissementRepository;
import mfpai.gouv.sn.service.EtablissementService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link Etablissement}.
 */
@Service
@Transactional
public class EtablissementServiceImpl implements EtablissementService {

    private final Logger log = LoggerFactory.getLogger(EtablissementServiceImpl.class);

    private final EtablissementRepository etablissementRepository;

    public EtablissementServiceImpl(EtablissementRepository etablissementRepository) {
        this.etablissementRepository = etablissementRepository;
    }

    @Override
    public Etablissement save(Etablissement etablissement) {
        log.debug("Request to save Etablissement : {}", etablissement);
        return etablissementRepository.save(etablissement);
    }

    @Override
    public Optional<Etablissement> partialUpdate(Etablissement etablissement) {
        log.debug("Request to partially update Etablissement : {}", etablissement);

        return etablissementRepository
            .findById(etablissement.getId())
            .map(existingEtablissement -> {
                if (etablissement.getMatriculeEtab() != null) {
                    existingEtablissement.setMatriculeEtab(etablissement.getMatriculeEtab());
                }
                if (etablissement.getTypeEtab() != null) {
                    existingEtablissement.setTypeEtab(etablissement.getTypeEtab());
                }
                if (etablissement.getAutrenomEtab() != null) {
                    existingEtablissement.setAutrenomEtab(etablissement.getAutrenomEtab());
                }
                if (etablissement.getAnneeCre() != null) {
                    existingEtablissement.setAnneeCre(etablissement.getAnneeCre());
                }
                if (etablissement.getStatut() != null) {
                    existingEtablissement.setStatut(etablissement.getStatut());
                }
                if (etablissement.getRegion() != null) {
                    existingEtablissement.setRegion(etablissement.getRegion());
                }
                if (etablissement.getAutreRegion() != null) {
                    existingEtablissement.setAutreRegion(etablissement.getAutreRegion());
                }
                if (etablissement.getDepartement() != null) {
                    existingEtablissement.setDepartement(etablissement.getDepartement());
                }
                if (etablissement.getAutreDep() != null) {
                    existingEtablissement.setAutreDep(etablissement.getAutreDep());
                }
                if (etablissement.getCommune() != null) {
                    existingEtablissement.setCommune(etablissement.getCommune());
                }
                if (etablissement.getCodeRegion() != null) {
                    existingEtablissement.setCodeRegion(etablissement.getCodeRegion());
                }
                if (etablissement.getAutrecodeRegion() != null) {
                    existingEtablissement.setAutrecodeRegion(etablissement.getAutrecodeRegion());
                }
                if (etablissement.getEmailEtab() != null) {
                    existingEtablissement.setEmailEtab(etablissement.getEmailEtab());
                }
                if (etablissement.getTypeInsp() != null) {
                    existingEtablissement.setTypeInsp(etablissement.getTypeInsp());
                }

                return existingEtablissement;
            })
            .map(etablissementRepository::save);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<Etablissement> findAll(Pageable pageable) {
        log.debug("Request to get all Etablissements");
        return etablissementRepository.findAll(pageable);
    }

    public Page<Etablissement> findAllWithEagerRelationships(Pageable pageable) {
        return etablissementRepository.findAllWithEagerRelationships(pageable);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<Etablissement> findOne(Long id) {
        log.debug("Request to get Etablissement : {}", id);
        return etablissementRepository.findOneWithEagerRelationships(id);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete Etablissement : {}", id);
        etablissementRepository.deleteById(id);
    }
}
