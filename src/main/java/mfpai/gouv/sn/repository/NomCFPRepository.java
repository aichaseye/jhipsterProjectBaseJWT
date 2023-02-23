package mfpai.gouv.sn.repository;

import mfpai.gouv.sn.domain.NomCFP;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the NomCFP entity.
 */
@SuppressWarnings("unused")
@Repository
public interface NomCFPRepository extends JpaRepository<NomCFP, Long> {}
