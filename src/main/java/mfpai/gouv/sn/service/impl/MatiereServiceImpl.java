package mfpai.gouv.sn.service.impl;

import java.util.Optional;
import mfpai.gouv.sn.domain.Matiere;
import mfpai.gouv.sn.repository.MatiereRepository;
import mfpai.gouv.sn.service.MatiereService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link Matiere}.
 */
@Service
@Transactional
public class MatiereServiceImpl implements MatiereService {

    private final Logger log = LoggerFactory.getLogger(MatiereServiceImpl.class);

    private final MatiereRepository matiereRepository;

    public MatiereServiceImpl(MatiereRepository matiereRepository) {
        this.matiereRepository = matiereRepository;
    }

    @Override
    public Matiere save(Matiere matiere) {
        log.debug("Request to save Matiere : {}", matiere);
        return matiereRepository.save(matiere);
    }

    @Override
    public Optional<Matiere> partialUpdate(Matiere matiere) {
        log.debug("Request to partially update Matiere : {}", matiere);

        return matiereRepository
            .findById(matiere.getId())
            .map(existingMatiere -> {
                if (matiere.getNomMatiere() != null) {
                    existingMatiere.setNomMatiere(matiere.getNomMatiere());
                }
                if (matiere.getReference() != null) {
                    existingMatiere.setReference(matiere.getReference());
                }
                if (matiere.getImage() != null) {
                    existingMatiere.setImage(matiere.getImage());
                }
                if (matiere.getImageContentType() != null) {
                    existingMatiere.setImageContentType(matiere.getImageContentType());
                }
                if (matiere.getMatriculeMatiere() != null) {
                    existingMatiere.setMatriculeMatiere(matiere.getMatriculeMatiere());
                }
                if (matiere.getRegion() != null) {
                    existingMatiere.setRegion(matiere.getRegion());
                }
                if (matiere.getAutreRegion() != null) {
                    existingMatiere.setAutreRegion(matiere.getAutreRegion());
                }
                if (matiere.getCodeRegion() != null) {
                    existingMatiere.setCodeRegion(matiere.getCodeRegion());
                }
                if (matiere.getAutrecodeRegion() != null) {
                    existingMatiere.setAutrecodeRegion(matiere.getAutrecodeRegion());
                }
                if (matiere.getTypeStructure() != null) {
                    existingMatiere.setTypeStructure(matiere.getTypeStructure());
                }
                if (matiere.getAutreStructure() != null) {
                    existingMatiere.setAutreStructure(matiere.getAutreStructure());
                }
                if (matiere.getAnneeAffectation() != null) {
                    existingMatiere.setAnneeAffectation(matiere.getAnneeAffectation());
                }

                return existingMatiere;
            })
            .map(matiereRepository::save);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<Matiere> findAll(Pageable pageable) {
        log.debug("Request to get all Matieres");
        return matiereRepository.findAll(pageable);
    }

    public Page<Matiere> findAllWithEagerRelationships(Pageable pageable) {
        return matiereRepository.findAllWithEagerRelationships(pageable);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<Matiere> findOne(Long id) {
        log.debug("Request to get Matiere : {}", id);
        return matiereRepository.findOneWithEagerRelationships(id);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete Matiere : {}", id);
        matiereRepository.deleteById(id);
    }
}
