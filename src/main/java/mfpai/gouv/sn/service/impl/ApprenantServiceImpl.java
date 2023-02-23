package mfpai.gouv.sn.service.impl;

import java.util.Optional;
import mfpai.gouv.sn.domain.Apprenant;
import mfpai.gouv.sn.repository.ApprenantRepository;
import mfpai.gouv.sn.service.ApprenantService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link Apprenant}.
 */
@Service
@Transactional
public class ApprenantServiceImpl implements ApprenantService {

    private final Logger log = LoggerFactory.getLogger(ApprenantServiceImpl.class);

    private final ApprenantRepository apprenantRepository;

    public ApprenantServiceImpl(ApprenantRepository apprenantRepository) {
        this.apprenantRepository = apprenantRepository;
    }

    @Override
    public Apprenant save(Apprenant apprenant) {
        log.debug("Request to save Apprenant : {}", apprenant);
        return apprenantRepository.save(apprenant);
    }

    @Override
    public Optional<Apprenant> partialUpdate(Apprenant apprenant) {
        log.debug("Request to partially update Apprenant : {}", apprenant);

        return apprenantRepository
            .findById(apprenant.getId())
            .map(existingApprenant -> {
                if (apprenant.getMatriculeApp() != null) {
                    existingApprenant.setMatriculeApp(apprenant.getMatriculeApp());
                }
                if (apprenant.getNom() != null) {
                    existingApprenant.setNom(apprenant.getNom());
                }
                if (apprenant.getPrenom() != null) {
                    existingApprenant.setPrenom(apprenant.getPrenom());
                }
                if (apprenant.getSexe() != null) {
                    existingApprenant.setSexe(apprenant.getSexe());
                }
                if (apprenant.getTelephone() != null) {
                    existingApprenant.setTelephone(apprenant.getTelephone());
                }
                if (apprenant.getEmail() != null) {
                    existingApprenant.setEmail(apprenant.getEmail());
                }

                return existingApprenant;
            })
            .map(apprenantRepository::save);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<Apprenant> findAll(Pageable pageable) {
        log.debug("Request to get all Apprenants");
        return apprenantRepository.findAll(pageable);
    }

    public Page<Apprenant> findAllWithEagerRelationships(Pageable pageable) {
        return apprenantRepository.findAllWithEagerRelationships(pageable);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<Apprenant> findOne(Long id) {
        log.debug("Request to get Apprenant : {}", id);
        return apprenantRepository.findOneWithEagerRelationships(id);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete Apprenant : {}", id);
        apprenantRepository.deleteById(id);
    }
}
